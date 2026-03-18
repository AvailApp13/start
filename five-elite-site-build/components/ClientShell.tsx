'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { localeLabels, locales, type Locale } from '@/lib/content';
import { useLang } from '@/components/LanguageProvider';

export function Header() {
  const { t, locale, setLocale } = useLang();
  return (
    <header className="header">
      <div className="navWrap">
        <Link href="/" className="brand">
          <Image src="/logo.png" alt="Five Elite Entertainment Bali logo" width={34} height={34} className="logo" />
          <div>
            <div className="brandTitle">FIVE ELITE</div>
            <div className="brandSub">ENTERTAINMENT BALI</div>
          </div>
        </Link>
        <nav className="navLinks">
          <Link href="/">{t.nav.home}</Link>
          <Link href="/about">{t.nav.about}</Link>
          <Link href="/services">{t.nav.services}</Link>
          <Link href="/gallery">{t.nav.gallery}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
        </nav>
        <div className="langSelect">
          <span>{t.nav.language}</span>
          <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
            {locales.map((code) => (
              <option value={code} key={code}>{localeLabels[code]}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export function PageHero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="halo haloOne" />
      <div className="halo haloTwo" />
      <div className="mesh" />
      <div className="container heroInner">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="kicker">{t.hero.kicker}</motion.div>
        <h1 className="heroTitle">
          <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}>{t.hero.titleA}</motion.span>
          <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.14 }}>{t.hero.titleB}</motion.span>
          <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.23 }}>{t.hero.titleC}</motion.span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="heroText">{t.hero.text}</motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38 }} className="heroActions">
          <Link href="/services" className="btn btnPrimary">{t.hero.primary}</Link>
          <Link href="/contact" className="btn btnGhost">{t.hero.secondary}</Link>
        </motion.div>
        <div className="chipRow">
          {t.hero.chips.map((chip) => <span key={chip} className="chip">{chip}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerBrand">FIVE ELITE ENTERTAINMENT BALI</div>
          <div className="footerText">{t.footer}</div>
        </div>
        <div className="footerNav">
          <Link href="/services">{t.nav.services}</Link>
          <Link href="/gallery">{t.nav.gallery}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="sectionHeading">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
