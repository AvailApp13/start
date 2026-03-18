'use client';
import { useLang } from '@/components/LanguageProvider';

export default function AboutPage() {
  const { t } = useLang();
  return (
    <main className="pageMain container">
      <div className="pageHeader">
        <div className="eyebrow">About</div>
        <h1 className="display">{t.about.title}</h1>
        <p className="leadText centered">{t.about.text}</p>
      </div>
      <div className="cards3">
        {t.about.cards.map(([title, text]) => (
          <div className="infoCard" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
