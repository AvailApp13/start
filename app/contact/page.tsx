'use client';
import { ContactButtons } from '@/components/ContactButtons';
import { useLang } from '@/components/LanguageProvider';

export default function ContactPage() {
  const { t } = useLang();
  return (
    <main className="pageMain container">
      <div className="pageHeader">
        <div className="eyebrow">Contact</div>
        <h1 className="display">{t.contact.title}</h1>
        <p className="leadText centered">{t.contact.text}</p>
      </div>
      <ContactButtons />
    </main>
  );
}
