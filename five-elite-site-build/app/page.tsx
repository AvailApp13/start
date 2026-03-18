'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHero, SectionHeading } from '@/components/ClientShell';
import { useLang } from '@/components/LanguageProvider';

function ServiceCard({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Link href={href} className="serviceCard">
      <div className="serviceGlow" />
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="serviceArrow">↗</span>
    </Link>
  );
}

export default function HomePage() {
  const { t } = useLang();
  return (
    <main>
      <PageHero />

      <section className="section container splitIntro">
        <div>
          <div className="eyebrow">01</div>
          <h2 className="display">{t.home.aboutTitle}</h2>
        </div>
        <p className="leadText">{t.home.aboutText}</p>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="02" title={t.home.servicesTitle} />
        <div className="cards2">
          <ServiceCard title={t.home.serviceA} text={t.home.serviceAText} href="/services" />
          <ServiceCard title={t.home.serviceB} text={t.home.serviceBText} href="/services" />
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="03" title={t.home.wowTitle} text={t.home.wowText} />
        <div className="luxuryBand">
          {['Glow Hover', 'Elegant Motion', 'Micro Interactions', 'Luxury Atmosphere'].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bandCard"
            >
              {label}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="04" title={t.home.galleryTitle} text={t.home.galleryText} />
        <div className="galleryPreview">
          {['One', 'Two', 'Three', 'Four'].map((item, index) => (
            <div className={`galleryTile tile${index + 1}`} key={item}>
              <span>Premium Placeholder</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="ctaPanel">
          <div>
            <div className="eyebrow">05</div>
            <h2 className="display small">{t.home.cta}</h2>
          </div>
          <Link href="/contact" className="btn btnPrimary">{t.hero.secondary}</Link>
        </div>
      </section>
    </main>
  );
}
