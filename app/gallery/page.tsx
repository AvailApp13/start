'use client';
import { useLang } from '@/components/LanguageProvider';

export default function GalleryPage() {
  const { t } = useLang();
  return (
    <main className="pageMain container">
      <div className="pageHeader">
        <div className="eyebrow">Gallery</div>
        <h1 className="display">{t.gallery.title}</h1>
        <p className="leadText centered">{t.gallery.text}</p>
      </div>
      <div className="galleryPageGrid">
        {t.gallery.items.map((item, index) => (
          <div className={`galleryBig galleryBig${index + 1}`} key={item}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
