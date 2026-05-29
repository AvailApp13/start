/* ============================================================
   PORTFOLIO.JS — движок галереи Феликс ДВ
   Читает window.PORTFOLIO_CONFIG и рендерит всё автоматически
   ============================================================ */

(function () {
  'use strict';

  // ── Инициализация после загрузки DOM ────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const cfg = window.PORTFOLIO_CONFIG;
    if (!cfg) return;

    initGallery(cfg);
    initLightbox();
    initFilters();
    initMenuToggle();
    animateCounter(cfg.projects.length);
  });

  // ================================================================
  // GALLERY ENGINE
  // ================================================================

  let currentProjects = []; // видимые сейчас проекты (для lightbox)

  function initGallery(cfg) {
    const grid  = document.getElementById('galleryGrid');
    const empty = document.getElementById('galleryEmpty');

    if (!cfg.projects || cfg.projects.length === 0) {
      if (empty) empty.classList.add('show');
      return;
    }

    renderCards(cfg.projects);
  }

  function renderCards(projects) {
    const grid  = document.getElementById('galleryGrid');
    const empty = document.getElementById('galleryEmpty');

    currentProjects = projects;
    grid.innerHTML  = '';

    if (projects.length === 0) {
      if (empty) empty.classList.add('show');
      return;
    }

    if (empty) empty.classList.remove('show');

    projects.forEach(function (proj, idx) {
      const card = buildCard(proj, idx);
      grid.appendChild(card);
    });

    // Intersection Observer для lazy load + appear animation
    observeCards();
  }

  function buildCard(proj, idx) {
    const card = document.createElement('div');
    const size = proj.size || 'medium';
    card.className = 'project-card size-' + size;
    card.dataset.index = idx;
    card.dataset.tags  = (proj.tags || []).join(' ');

    // Анимационная задержка для stagger-эффекта
    card.style.transitionDelay = Math.min(idx * 60, 400) + 'ms';

    card.innerHTML = [
      '<img class="project-img" data-src="' + esc(proj.src) + '" alt="' + esc(proj.title || '') + '">',
      '<div class="project-overlay">',
        '<p class="project-title">' + esc(proj.title || '') + '</p>',
        proj.desc ? '<p class="project-desc">' + esc(proj.desc) + '</p>' : '',
        buildTags(proj.tags),
      '</div>',
      '<div class="project-zoom">',
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none">',
          '<circle cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.8"/>',
          '<path d="M12 12L16 16" stroke="white" stroke-width="1.8" stroke-linecap="round"/>',
        '</svg>',
      '</div>',
    ].join('');

    card.addEventListener('click', function () {
      openLightbox(idx);
    });

    return card;
  }

  function buildTags(tags) {
    if (!tags || !tags.length) return '';
    const filters = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.filters) || {};
    return '<div class="project-tags">' +
      tags.map(function (t) {
        return '<span class="project-tag">' + esc(filters[t] || t) + '</span>';
      }).join('') +
    '</div>';
  }

  // ── Lazy Load + Appear Animation ────────────────────────
  function observeCards() {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const img  = card.querySelector('.project-img[data-src]');

        // Загружаем изображение
        if (img) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.onload  = function () { card.classList.add('visible'); };
          img.onerror = function () { card.classList.add('visible'); };
        } else {
          card.classList.add('visible');
        }

        io.unobserve(card);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project-card').forEach(function (c) {
      io.observe(c);
    });
  }

  // ================================================================
  // FILTERS
  // ================================================================

  function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    if (!btns.length) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });
  }

  function applyFilter(filter) {
    const cfg = window.PORTFOLIO_CONFIG;
    if (!cfg) return;

    let filtered;
    if (filter === 'all') {
      filtered = cfg.projects;
    } else {
      filtered = cfg.projects.filter(function (p) {
        return p.tags && p.tags.indexOf(filter) !== -1;
      });
    }

    renderCards(filtered);
  }

  // ================================================================
  // LIGHTBOX
  // ================================================================

  let lbIndex    = 0;
  let lbOpen     = false;
  let touchStartX = 0;

  function initLightbox() {
    const overlay = document.getElementById('lbOverlay');
    const lb      = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lbClose');
    const prevBtn  = document.getElementById('lbPrev');
    const nextBtn  = document.getElementById('lbNext');
    const img      = document.getElementById('lbImg');

    if (!overlay) return;

    // Закрытие
    overlay.addEventListener('click', closeLightbox);
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Навигация кнопками
    if (prevBtn) prevBtn.addEventListener('click', function () { navigate(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { navigate(1); });

    // Клавиатура
    document.addEventListener('keydown', function (e) {
      if (!lbOpen) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    // Swipe на мобильных
    if (lb) {
      lb.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lb.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 50) {
          navigate(dx < 0 ? 1 : -1);
        }
      }, { passive: true });
    }
  }

  function openLightbox(idx) {
    lbIndex = idx;
    lbOpen  = true;

    document.getElementById('lbOverlay').classList.add('open');
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';

    showImage(idx);
  }

  function closeLightbox() {
    lbOpen = false;
    document.getElementById('lbOverlay').classList.remove('open');
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    lbIndex = (lbIndex + dir + currentProjects.length) % currentProjects.length;
    showImage(lbIndex);
  }

  function showImage(idx) {
    const proj    = currentProjects[idx];
    const img     = document.getElementById('lbImg');
    const caption = document.getElementById('lbCaption');
    const counter = document.getElementById('lbCounter');
    const spinner = document.getElementById('lbSpinner');

    if (!proj || !img) return;

    // Показываем спиннер, скрываем изображение
    img.classList.add('loading');
    img.classList.remove('loaded');
    if (spinner) spinner.classList.add('show');

    const newImg  = new Image();
    newImg.src    = proj.src;
    newImg.onload = function () {
      img.src = proj.src;
      img.alt = proj.title || '';
      img.classList.remove('loading');
      img.classList.add('loaded');
      if (spinner) spinner.classList.remove('show');
    };
    newImg.onerror = function () {
      if (spinner) spinner.classList.remove('show');
      img.classList.remove('loading');
    };

    if (caption) caption.textContent = proj.title || '';
    if (counter) counter.textContent = (idx + 1) + ' / ' + currentProjects.length;
  }

  // ================================================================
  // COUNTER ANIMATION (stat)
  // ================================================================

  function animateCounter(total) {
    const el = document.getElementById('stat-count');
    if (!el || total === 0) return;

    el.textContent = total + '+';
  }

  // ================================================================
  // MOBILE MENU (повторяем из script.js на случай)
  // ================================================================

  function initMenuToggle() {
    const menuBtn  = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  // ================================================================
  // UTILITIES
  // ================================================================

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

})();
