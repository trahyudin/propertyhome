<?php
require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
$dbStatus = $pdo !== null ? 'connected' : 'disconnected (using file fallback)';
$leadCount = 0;
$projectCount = 0;

if ($pdo) {
    try {
        $leadCount = (int)$pdo->query('SELECT COUNT(*) FROM leads')->fetchColumn();
        $projectCount = (int)$pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();
    } catch (Exception $e) {
        $dbStatus = 'error: ' . $e->getMessage();
    }
}

sendJsonResponse(true, [
    'app' => 'Estatewerks API',
    'status' => 'healthy',
    'php_version' => PHP_VERSION,
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'database' => [
        'status' => $dbStatus,
        'driver' => 'MySQL / PDO',
        'host' => DB_HOST,
        'database_name' => DB_NAME,
        'leads_count' => $leadCount,
        'projects_count' => $projectCount
    ],
    'time' => date('c')
]);
