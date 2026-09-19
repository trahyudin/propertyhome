<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Read JSON payload or form data
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!is_array($input)) {
        $input = $_POST;
    }

    $email = isset($input['email']) ? trim($input['email']) : '';
    $name = isset($input['name']) ? trim($input['name']) : null;
    $phone = isset($input['phone']) ? trim($input['phone']) : null;
    $company = isset($input['company']) ? trim($input['company']) : null;
    $message = isset($input['message']) ? trim($input['message']) : null;
    $sourcePage = isset($input['sourcePage']) ? trim($input['sourcePage']) : (isset($input['source_page']) ? trim($input['source_page']) : 'footer-form');
    $lang = isset($input['lang']) ? trim($input['lang']) : 'id';
    
    $utm = isset($input['utm']) && is_array($input['utm']) ? $input['utm'] : [];
    $utmSource = isset($utm['source']) ? $utm['source'] : (isset($input['utm_source']) ? $input['utm_source'] : null);
    $utmCampaign = isset($utm['campaign']) ? $utm['campaign'] : (isset($input['utm_campaign']) ? $input['utm_campaign'] : null);

    // Validation: Email is required
    if (empty($email)) {
        sendJsonResponse(false, null, [
            'code' => 'MISSING_FIELD',
            'field' => 'email',
            'message' => 'Email wajib diisi'
        ], 422);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(false, null, [
            'code' => 'INVALID_EMAIL',
            'message' => 'Email tidak valid'
        ], 400);
    }

    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $createdAt = date('Y-m-d\TH:i:s\Z');

    $pdo = getDbConnection();

    if ($pdo) {
        try {
            $stmt = $pdo->prepare('
                INSERT INTO leads (email, name, phone, company, message, source_page, lang, utm_source, utm_campaign, ip_address, status, created_at)
                VALUES (:email, :name, :phone, :company, :message, :source_page, :lang, :utm_source, :utm_campaign, :ip_address, "new", NOW())
            ');

            $stmt->execute([
                ':email' => $email,
                ':name' => $name,
                ':phone' => $phone,
                ':company' => $company,
                ':message' => $message,
                ':source_page' => $sourcePage,
                ':lang' => $lang,
                ':utm_source' => $utmSource,
                ':utm_campaign' => $utmCampaign,
                ':ip_address' => $ipAddress
            ]);

            $newId = $pdo->lastInsertId();

            sendJsonResponse(true, [
                'id' => 'ld_' . $newId,
                'email' => $email,
                'status' => 'new',
                'createdAt' => $createdAt
            ], null, 201);
        } catch (Exception $e) {
            error_log('Database Lead Insert Error: ' . $e->getMessage());
        }
    }

    // Fallback: Store in file backup if database is not yet configured on cPanel
    $backupDir = __DIR__ . '/data';
    if (!is_dir($backupDir)) {
        @mkdir($backupDir, 0755, true);
    }

    $backupFile = $backupDir . '/leads.json';
    $existing = [];
    if (file_exists($backupFile)) {
        $existing = json_decode(file_get_contents($backupFile), true) ?: [];
    }

    $leadId = 'ld_local_' . substr(md5(uniqid(rand(), true)), 0, 8);
    $newLead = [
        'id' => $leadId,
        'email' => $email,
        'name' => $name,
        'phone' => $phone,
        'company' => $company,
        'message' => $message,
        'sourcePage' => $sourcePage,
        'lang' => $lang,
        'utm' => ['source' => $utmSource, 'campaign' => $utmCampaign],
        'ip' => $ipAddress,
        'status' => 'new',
        'createdAt' => $createdAt
    ];

    $existing[] = $newLead;
    @file_put_contents($backupFile, json_encode($existing, JSON_PRETTY_PRINT));

    sendJsonResponse(true, [
        'id' => $leadId,
        'email' => $email,
        'status' => 'new',
        'createdAt' => $createdAt,
        'note' => 'Stored via file backup (database pending setup)'
    ], null, 201);

} elseif ($method === 'GET') {
    // List leads (accessible for admin / diagnostic)
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->query('SELECT id, email, name, phone, company, message, source_page, lang, status, created_at FROM leads ORDER BY id DESC LIMIT 100');
            $leads = $stmt->fetchAll();
            sendJsonResponse(true, $leads);
        } catch (Exception $e) {
            sendJsonResponse(false, null, ['code' => 'DB_ERROR', 'message' => $e->getMessage()], 500);
        }
    }

    // Fallback file reading
    $backupFile = __DIR__ . '/data/leads.json';
    if (file_exists($backupFile)) {
        $data = json_decode(file_get_contents($backupFile), true) ?: [];
        sendJsonResponse(true, array_reverse($data));
    }

    sendJsonResponse(true, []);
} else {
    sendJsonResponse(false, null, ['code' => 'METHOD_NOT_ALLOWED'], 405);
}
