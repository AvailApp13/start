'use client';
import { FaWhatsapp, FaInstagram, FaGoogle, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { contact } from '@/lib/content';
import { useLang } from '@/components/LanguageProvider';

export function ContactButtons() {
  const { t } = useLang();
  const items = [
    { icon: <FaWhatsapp />, title: 'WhatsApp', text: contact.phoneDisplay, href: contact.whatsappLink },
    { icon: <FaPhoneAlt />, title: 'Call', text: contact.phoneDisplay, href: contact.phoneLink },
    { icon: <FaInstagram />, title: 'Instagram', text: contact.instagramLabel, href: contact.instagramUrl },
    { icon: <FaGoogle />, title: 'Email', text: contact.email, href: contact.emailLink },
    { icon: <FaMapMarkerAlt />, title: t.contact.title, text: contact.address, href: contact.mapLink }
  ];

  return (
    <div className="contactGrid">
      {items.map((item) => (
        <a href={item.href} key={item.title + item.text} className="contactCard" target="_blank" rel="noreferrer">
          <div className="contactIcon">{item.icon}</div>
          <div>
            <div className="contactTitle">{item.title}</div>
            <div className="contactText">{item.text}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
