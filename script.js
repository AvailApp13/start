
const translations = {
  en: {
    heroKicker: "Luxury Event Organizer & Artist Management in Bali",
    heroTitle: "Creating memorable events with a cinematic Bali luxury feel.",
    heroText: "FIVE ELITE ENTERTAINMENT BALI delivers premium event organizer and artist management services for private celebrations, luxury gatherings, corporate events, clubs, restaurants, and entertainment experiences.",
    btnServices: "Explore Services",
    btnContact: "Contact Us",
    aboutTitle: "A premium Bali brand for events and entertainment",
    aboutText: "FIVE ELITE ENTERTAINMENT BALI is an Event Organizer and Artist Management company committed to creating professional and memorable events while supporting and developing talented artists in the entertainment industry.",
    eoTitle: "Event Organizer Services",
    eo1: "Event concept planning",
    eo2: "Venue and decoration management",
    eo3: "Entertainment and artist booking",
    eo4: "Event logistics coordination",
    eo5: "Budget management",
    eo6: "On-site problem solving and event handling",
    amTitle: "Artist Management Services",
    am1: "Artist career development",
    am2: "Scheduling and activity management",
    am3: "Securing job opportunities and brand endorsements",
    am4: "Contract negotiation and artist fee management",
    am5: "Branding and promotional strategy development",
    galleryTitle: "Atmosphere & Event Mood",
    galleryText: "Selected Bali-style mood images are added temporarily and can later be replaced with real event photos from the company.",
    g1: "Elegant banquet hall",
    g2: "Live artist performance",
    g3: "Private celebration",
    contactTitle: "Contact",
    contactText: "All contact buttons are clickable.",
    mapTitle: "Google Map",
    footerText: "Creating memorable events & professional entertainment"
  },
  ru: {
    heroKicker: "Премиальная организация мероприятий и артист-менеджмент на Бали",
    heroTitle: "Создаём незабываемые мероприятия с кинематографичным Bali luxury настроением.",
    heroText: "FIVE ELITE ENTERTAINMENT BALI оказывает премиальные услуги по организации мероприятий и артист-менеджменту для частных праздников, luxury-событий, корпоративных мероприятий, клубов, ресторанов и entertainment-проектов.",
    btnServices: "Посмотреть услуги",
    btnContact: "Связаться",
    aboutTitle: "Премиальный бренд Бали для event и entertainment",
    aboutText: "FIVE ELITE ENTERTAINMENT BALI — это компания по организации мероприятий и управлению артистами, которая создаёт профессиональные и запоминающиеся события, поддерживая и развивая талантливых артистов в индустрии развлечений.",
    eoTitle: "Услуги Event Organizer",
    eo1: "Разработка концепции мероприятия",
    eo2: "Управление площадкой и декором",
    eo3: "Бронирование артистов и entertainment",
    eo4: "Координация логистики",
    eo5: "Управление бюджетом",
    eo6: "Решение вопросов на площадке и полное ведение события",
    amTitle: "Услуги Artist Management",
    am1: "Развитие карьеры артиста",
    am2: "Управление расписанием и активностями",
    am3: "Поиск возможностей и бренд-партнёрств",
    am4: "Переговоры по контрактам и гонорарам",
    am5: "Развитие бренда и промо-стратегии",
    galleryTitle: "Атмосфера и mood мероприятий",
    galleryText: "Эти mood-фотографии в стиле Бали добавлены временно и позже могут быть заменены на реальные фотографии мероприятий компании.",
    g1: "Элегантный банкетный зал",
    g2: "Выступление артиста",
    g3: "Частное мероприятие",
    contactTitle: "Контакты",
    contactText: "Все кнопки контактов кликабельны.",
    mapTitle: "Google Карта",
    footerText: "Создаём незабываемые мероприятия и профессиональное entertainment-сопровождение"
  },
  id: {
    heroKicker: "Event Organizer premium & Artist Management di Bali",
    heroTitle: "Menciptakan event berkesan dengan nuansa cinematic Bali luxury.",
    heroText: "FIVE ELITE ENTERTAINMENT BALI menghadirkan layanan premium event organizer dan artist management untuk perayaan private, luxury gathering, corporate event, club, restaurant, dan entertainment experience.",
    btnServices: "Lihat Layanan",
    btnContact: "Hubungi Kami",
    aboutTitle: "Brand premium Bali untuk event dan entertainment",
    aboutText: "FIVE ELITE ENTERTAINMENT BALI adalah perusahaan Event Organizer dan Artist Management yang berkomitmen menciptakan acara profesional dan berkesan sambil mendukung dan mengembangkan artis berbakat di industri hiburan.",
    eoTitle: "Layanan Event Organizer",
    eo1: "Perencanaan konsep event",
    eo2: "Manajemen venue dan dekorasi",
    eo3: "Booking entertainment dan artis",
    eo4: "Koordinasi logistik event",
    eo5: "Manajemen budget",
    eo6: "Problem solving on-site dan penanganan event",
    amTitle: "Layanan Artist Management",
    am1: "Pengembangan karier artis",
    am2: "Manajemen jadwal dan aktivitas",
    am3: "Mencari peluang kerja dan brand endorsement",
    am4: "Negosiasi kontrak dan manajemen fee artis",
    am5: "Pengembangan branding dan strategi promosi",
    galleryTitle: "Atmosfer & Mood Event",
    galleryText: "Foto mood bergaya Bali ini ditambahkan sementara dan nanti bisa diganti dengan foto event asli dari perusahaan.",
    g1: "Ballroom dan banquet elegan",
    g2: "Penampilan artis live",
    g3: "Perayaan private",
    contactTitle: "Kontak",
    contactText: "Semua tombol kontak bisa diklik.",
    mapTitle: "Google Map",
    footerText: "Creating memorable events & professional entertainment"
  }
};

const els = document.querySelectorAll(".i18n");
const langBtns = document.querySelectorAll(".lang-btn");

function setLang(lang){
  els.forEach(el => {
    const key = el.dataset.key;
    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }
  });
  langBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  localStorage.setItem("five-elite-lang", lang);
}

langBtns.forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

const saved = localStorage.getItem("five-elite-lang") || "en";
setLang(saved);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
