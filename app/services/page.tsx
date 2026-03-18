'use client';
import { useLang } from '@/components/LanguageProvider';

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="listCard">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  const { t } = useLang();
  return (
    <main className="pageMain container">
      <div className="pageHeader">
        <div className="eyebrow">Services</div>
        <h1 className="display">{t.services.title}</h1>
      </div>
      <div className="cards2">
        <ListCard title={t.services.eo} items={t.services.eoList} />
        <ListCard title={t.services.am} items={t.services.amList} />
      </div>
    </main>
  );
}
