export const contact = {
  instagramLabel: '@fiveeliteentertainmentbali',
  instagramUrl: 'https://instagram.com/fiveeliteentertainmentbali',
  phoneDisplay: '+62 813-3823-820',
  phoneLink: 'tel:+628133823820',
  whatsappLink: 'https://wa.me/628133823820',
  email: 'limabersamcreativegroup@gmail.com',
  emailLink: 'mailto:limabersamcreativegroup@gmail.com',
  address: '86MV+R5F, Gg. Cengana Sari III, Sumerta Kelod, Kec. Denpasar Tim., Kota Denpasar, Bali 80239',
  mapLink: 'https://maps.app.goo.gl/egYfEdUwfruaQrhD8?g_st=ipc'
};

export const locales = ['en', 'ru', 'id'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  id: 'Bahasa Indonesia'
};

export const content = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', gallery: 'Gallery', contact: 'Contact', language: 'Language' },
    hero: {
      kicker: 'Luxury Event Organizer & Artist Management in Bali',
      titleA: 'Elevated',
      titleB: 'Events',
      titleC: '& Entertainment',
      text: 'FIVE ELITE ENTERTAINMENT BALI creates premium events, artist experiences, and unforgettable moments with a refined Bali luxury aesthetic.',
      primary: 'Explore Services',
      secondary: 'Contact Us',
      chips: ['Luxury', 'Bali Mood', 'High-End Service']
    },
    home: {
      aboutTitle: 'A premium Bali brand for events and entertainment',
      aboutText: 'We build high-touch event experiences for tourists, corporate clients, luxury audiences, clubs, and restaurants. From concept to on-site execution, every detail is curated to feel exclusive and effortless.',
      servicesTitle: 'What we do',
      serviceA: 'Event Organizer',
      serviceAText: 'Concept planning, venue and decoration management, entertainment booking, logistics, budget control, and on-site handling.',
      serviceB: 'Artist Management',
      serviceBText: 'Career development, scheduling, endorsements, contract negotiation, branding, and promotional support for artists.',
      wowTitle: 'Designed to feel cinematic, modern, and luxurious',
      wowText: 'The visual language is built around glow, motion, elegant typography, and subtle Bali-inspired atmosphere. Buttons, cards, and transitions are animated for a refined “wow” effect.',
      galleryTitle: 'Visual showcase ready for real photos',
      galleryText: 'Your gallery is prepared as a premium grid. When you add real event images, the site will feel even stronger.',
      cta: 'Let us build your next unforgettable moment.'
    },
    about: {
      title: 'About Our Company',
      text: 'FIVE ELITE ENTERTAINMENT BALI is an Event Organizer and Artist Management company committed to creating professional and memorable events while supporting talented artists in the entertainment industry.',
      cards: [
        ['Who we serve', 'Tourists, corporate clients, luxury audiences, clubs, restaurants, and partners seeking premium entertainment experiences in Bali.'],
        ['Brand feeling', 'Dark, minimal, elegant, and exclusive. The experience should feel premium from the first second.'],
        ['Our promise', 'Beautiful concepts, organized execution, and a polished final experience for every client and guest.']
      ]
    },
    services: {
      title: 'Services',
      eo: 'Event Organizer Services',
      eoList: [
        'Event concept planning',
        'Venue and decoration management',
        'Entertainment and artist booking',
        'Event logistics coordination',
        'Budget management',
        'On-site problem solving and event handling'
      ],
      am: 'Artist Management Services',
      amList: [
        'Artist career development',
        'Scheduling and activity management',
        'Securing job opportunities and brand endorsements',
        'Contract negotiation and artist fee management',
        'Branding and promotional strategy development'
      ]
    },
    gallery: {
      title: 'Gallery',
      text: 'A luxury visual grid prepared for real event images, artist moments, venue styling, and premium Bali atmosphere.',
      items: ['Private Events', 'Corporate Gatherings', 'Artist Moments', 'Venue Styling', 'Luxury Nights', 'Bali Atmosphere']
    },
    contact: { title: 'Contact', text: 'All contact buttons below are fully clickable.' },
    footer: 'Creating memorable events & professional entertainment'
  },
  ru: {
    nav: { home: 'Главная', about: 'О компании', services: 'Услуги', gallery: 'Галерея', contact: 'Контакты', language: 'Язык' },
    hero: {
      kicker: 'Премиальная организация мероприятий и артист-менеджмент на Бали',
      titleA: 'Элитные',
      titleB: 'События',
      titleC: '& Entertainment',
      text: 'FIVE ELITE ENTERTAINMENT BALI создаёт премиальные мероприятия, артистические проекты и запоминающиеся впечатления в эстетике Bali luxury.',
      primary: 'Посмотреть услуги',
      secondary: 'Связаться',
      chips: ['Luxury', 'Bali Mood', 'Премиум сервис']
    },
    home: {
      aboutTitle: 'Премиальный бренд Бали для мероприятий и entertainment',
      aboutText: 'Мы создаём продуманные события для туристов, корпоративных клиентов, luxury-аудитории, клубов и ресторанов. От концепции до реализации на площадке — каждая деталь выглядит эксклюзивно и безупречно.',
      servicesTitle: 'Чем мы занимаемся',
      serviceA: 'Event Organizer',
      serviceAText: 'Концепция мероприятия, площадка и декор, бронирование артистов, логистика, бюджет и управление событием на месте.',
      serviceB: 'Artist Management',
      serviceBText: 'Развитие карьеры артиста, расписание, рекламные интеграции, переговоры по контрактам, бренд и продвижение.',
      wowTitle: 'Сайт задуман как кинематографичный, современный и дорогой',
      wowText: 'Визуальный язык строится на мягких подсветках, движении, типографике и тонкой атмосфере Бали. Кнопки, карточки и переходы анимированы для дорогого wow-эффекта.',
      galleryTitle: 'Визуальная витрина готова под реальные фото',
      galleryText: 'Галерея уже собрана как премиальная сетка. Когда вы добавите реальные фотографии, сайт станет ещё сильнее.',
      cta: 'Давайте создадим ваше следующее незабываемое событие.'
    },
    about: {
      title: 'О компании',
      text: 'FIVE ELITE ENTERTAINMENT BALI — это компания по организации мероприятий и управлению артистами, которая создаёт профессиональные и запоминающиеся события, поддерживая талантливых артистов в индустрии развлечений.',
      cards: [
        ['Для кого мы работаем', 'Туристы, корпоративные клиенты, luxury-аудитория, клубы, рестораны и партнёры, которым нужен премиальный entertainment на Бали.'],
        ['Ощущение бренда', 'Тёмный, минималистичный, элегантный и эксклюзивный. Сайт должен чувствоваться дорогим с первой секунды.'],
        ['Наше обещание', 'Красивые концепции, чёткая реализация и отточенный финальный опыт для каждого клиента и гостя.']
      ]
    },
    services: {
      title: 'Услуги',
      eo: 'Услуги Event Organizer',
      eoList: [
        'Разработка концепции мероприятия',
        'Управление площадкой и декором',
        'Бронирование артистов и entertainment',
        'Координация логистики',
        'Управление бюджетом',
        'Решение вопросов на площадке и полное ведение события'
      ],
      am: 'Услуги Artist Management',
      amList: [
        'Развитие карьеры артиста',
        'Управление расписанием и активностями',
        'Поиск возможностей и бренд-партнёрств',
        'Переговоры по контрактам и гонорарам',
        'Развитие бренда и промо-стратегии'
      ]
    },
    gallery: {
      title: 'Галерея',
      text: 'Премиальная визуальная сетка, подготовленная под реальные фотографии мероприятий, артистов, декора и luxury-атмосферы Бали.',
      items: ['Частные события', 'Корпоративные встречи', 'Артисты', 'Декор площадки', 'Luxury Nights', 'Атмосфера Бали']
    },
    contact: { title: 'Контакты', text: 'Все кнопки ниже полностью кликабельны.' },
    footer: 'Создаём незабываемые мероприятия и профессиональное entertainment-сопровождение'
  },
  id: {
    nav: { home: 'Beranda', about: 'Tentang', services: 'Layanan', gallery: 'Galeri', contact: 'Kontak', language: 'Bahasa' },
    hero: {
      kicker: 'Event Organizer premium & Artist Management di Bali',
      titleA: 'Event',
      titleB: 'Mewah',
      titleC: '& Entertainment',
      text: 'FIVE ELITE ENTERTAINMENT BALI menghadirkan event premium, pengalaman artis, dan momen tak terlupakan dengan nuansa luxury Bali.',
      primary: 'Lihat Layanan',
      secondary: 'Hubungi Kami',
      chips: ['Luxury', 'Nuansa Bali', 'Layanan Premium']
    },
    home: {
      aboutTitle: 'Brand premium Bali untuk event dan entertainment',
      aboutText: 'Kami menciptakan pengalaman event yang terkurasi untuk turis, klien korporat, audiens luxury, klub, dan restoran. Dari konsep hingga eksekusi di lokasi, setiap detail dibuat terasa eksklusif.',
      servicesTitle: 'Apa yang kami lakukan',
      serviceA: 'Event Organizer',
      serviceAText: 'Perencanaan konsep, venue dan dekorasi, booking artis, logistik, pengelolaan budget, dan penanganan event di lokasi.',
      serviceB: 'Artist Management',
      serviceBText: 'Pengembangan karier artis, penjadwalan, endorsement, negosiasi kontrak, branding, dan dukungan promosi.',
      wowTitle: 'Dirancang agar terasa sinematik, modern, dan mewah',
      wowText: 'Bahasa visual website ini dibangun dengan glow, motion, tipografi elegan, dan atmosfer Bali yang halus. Tombol, kartu, dan transisi dianimasikan untuk efek wow yang refined.',
      galleryTitle: 'Showcase visual siap untuk foto asli',
      galleryText: 'Galeri sudah disiapkan sebagai grid premium. Saat foto event asli ditambahkan, website akan terasa jauh lebih kuat.',
      cta: 'Mari ciptakan event Anda berikutnya yang tak terlupakan.'
    },
    about: {
      title: 'Tentang Perusahaan',
      text: 'FIVE ELITE ENTERTAINMENT BALI adalah perusahaan Event Organizer dan Artist Management yang berkomitmen menciptakan acara profesional dan berkesan sambil mendukung artis berbakat di industri hiburan.',
      cards: [
        ['Siapa klien kami', 'Turis, klien korporat, audiens luxury, klub, restoran, dan partner yang mencari pengalaman entertainment premium di Bali.'],
        ['Rasa brand', 'Gelap, minimal, elegan, dan eksklusif. Website harus terasa premium sejak detik pertama.'],
        ['Janji kami', 'Konsep yang indah, eksekusi yang rapi, dan hasil akhir yang polished untuk setiap klien dan tamu.']
      ]
    },
    services: {
      title: 'Layanan',
      eo: 'Layanan Event Organizer',
      eoList: [
        'Perencanaan konsep acara',
        'Manajemen venue dan dekorasi',
        'Booking artis dan entertainment',
        'Koordinasi logistik event',
        'Manajemen anggaran',
        'Problem solving on-site dan penanganan acara'
      ],
      am: 'Layanan Artist Management',
      amList: [
        'Pengembangan karier artis',
        'Pengelolaan jadwal dan aktivitas',
        'Mencari peluang kerja dan endorsement',
        'Negosiasi kontrak dan fee artis',
        'Pengembangan branding dan strategi promosi'
      ]
    },
    gallery: {
      title: 'Galeri',
      text: 'Grid visual premium yang disiapkan untuk foto event asli, momen artis, venue styling, dan atmosfer luxury Bali.',
      items: ['Event Private', 'Acara Corporate', 'Momen Artis', 'Venue Styling', 'Luxury Nights', 'Atmosfer Bali']
    },
    contact: { title: 'Kontak', text: 'Semua tombol di bawah ini sepenuhnya bisa diklik.' },
    footer: 'Menciptakan event berkesan & entertainment profesional'
  }
};
