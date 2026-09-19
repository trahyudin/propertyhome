import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function WhatsAppBar() {
  const { t } = useLang();
  return (
    <a
      href="https://wa.me/628112223456"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.waAria}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,0.65)] transition-transform hover:scale-110"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t.waCta}</span>
    </a>
  );
}
