/* ============================================================
   PORTFOLIO.JS — движок галереи Феликс ДВ v2.0
   Загружает изображения из JSON-манифестов автоматически.
   Пользователь кладёт фото в assets/projects/<раздел>/
   и прописывает имена в JSON-манифест.
   ============================================================ */

(function () {
  'use strict';

  /* ── КАТЕГОРИИ ─────────────────────────────────────────── */
  var CATEGORIES = {
    fundament: {
      label:    'Фундаменты',
      subtitle: 'Фундаменты любых типов, подпорные стены, плиты перекрытия, монолитные конструкции',
      icon:     '🏗',
      color:    '#d8b43d',
      filters:  { monolith: 'Монолитный', strip: 'Ленточный', pile: 'Свайный' }
    },
    kladka: {
      label:    'Кладка',
      subtitle: 'Кирпичная кладка, газоблок, ракушечник, несущие и ненесущие конструкции',
      icon:     '🧱',
      color:    '#e07a5f',
      filters:  { brick: 'Кирпич', block: 'Блок', stone: 'Камень' }
    },
    krovlya: {
      label:    'Кровля',
      subtitle: 'Монтаж и ремонт кровли любой сложности — металлочерепица, профнастил, мягкая кровля',
      icon:     '🏠',
      color:    '#5b99c2',
      filters:  { flat: 'Плоская', pitched: 'Скатная', repair: 'Ремонт' }
    },
    otdelka: {
      label:    'Отделка',
      subtitle: 'Чистовая и черновая отделка, фасады, штукатурка, облицовка',
      icon:     '✨',
      color:    '#a5c95a',
      filters:  { interior: 'Интерьер', facade: 'Фасад', floor: 'Полы' }
    },
    zabory: {
      label:    'Заборы',
      subtitle: 'Заборы, ворота, ландшафтное благоустройство территорий',
      icon:     '🚧',
      color:    '#9b8fcf',
      filters:  { metal: 'Металл', brick: 'Кирпич', landscape: 'Благоустройство' }
    }
  };

  /* ── СТЕЙТ ─────────────────────────────────────────────── */
  var allProjects     = [];
  var currentProjects = [];
  var lightboxIndex   = 0;
  var touchStartX     = 0;

  /* ── ОПРЕДЕЛИТЬ КАТЕГОРИЮ ───────────────────────────────── */
  function detectCategory() {
    var path = window.location.pathname;
    var keys = Object.keys(CATEGORIES);
    for (var i = 0; i < keys.length; i++) {
      if (path.indexOf(keys[i]) !== -1) return keys[i];
    }
    return (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.category) || null;
  }

  /* ── ПУТЬ К МАНИФЕСТУ ──────────────────────────────────── */
  function manifestPath(category) {
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    return isInPages
      ? '../assets/projects/' + category + '.json'
      : 'assets/projects/' + category + '.json';
  }

  /* ── BASE DIR ──────────────────────────────────────────── */
  function baseDir(category) {
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    return isInPages
      ? '../assets/projects/' + category + '/'
      : 'assets/projects/' + category + '/';
  }

  /* ── ИНИЦИАЛИЗАЦИЯ ─────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var category = detectCategory();
    if (!category || !CATEGORIES[category]) return;
    var meta = CATEGORIES[category];
    applyThemeColor(meta.color);
    buildFilterButtons(meta.filters);
    initMenuToggle();
    loadManifest(category, meta);
  });

  function applyThemeColor(color) {
    document.documentElement.style.setProperty('--cat-color', color);
  }

  /* ── ЗАГРУЗИТЬ МАНИФЕСТ ────────────────────────────────── */
  function loadManifest(category, meta) {
    var url = manifestPath(category);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data = JSON.parse(xhr.responseText);
          var dir  = baseDir(category);
          allProjects = (data.images || []).map(function (item) {
            if (typeof item === 'string') {
              return { src: dir + item, title: '', desc: '', tags: [], size: 'medium' };
            }
            return {
              src:   dir + (item.file || item.src || ''),
              title: item.title || '',
              desc:  item.desc  || '',
              tags:  Array.isArray(item.tags) ? item.tags : [],
              size:  item.size  || 'medium'
            };
          });
          currentProjects = allProjects;
          renderGrid(allProjects);
          initLightbox();
          initFilters();
          animateCounter(allProjects.length);
        } catch (e) {
          showEmpty();
          animateCounter(0);
        }
      } else {
        showEmpty();
        animateCounter(0);
      }
    };
    xhr.onerror = function () { showEmpty(); animateCounter(0); };
    xhr.send();
  }

  /* ── РЕНДЕР СЕТКИ ──────────────────────────────────────── */
  function renderGrid(projects) {
    var grid  = document.getElementById('galleryGrid');
    var empty = document.getElementById('galleryEmpty');
    if (!grid) return;
    grid.innerHTML = '';
    if (!projects || projects.length === 0) { showEmpty(); return; }
    if (empty) empty.classList.remove('show');
    for (var i = 0; i < projects.length; i++) {
      grid.appendChild(buildCard(projects[i], i));
    }
    observeCards();
  }

  /* ── КАРТОЧКА ──────────────────────────────────────────── */
  function buildCard(proj, idx) {
    var card = document.createElement('article');
    card.className = 'gallery-card size-' + (proj.size || 'medium');
    card.dataset.index = idx;
    if (proj.tags && proj.tags.length) card.dataset.tags = proj.tags.join(',');

    var bodyHtml = '';
    if (proj.title || proj.desc) {
      bodyHtml = '<div class="card-body">' +
        (proj.title ? '<p class="card-title">' + esc(proj.title) + '</p>' : '') +
        (proj.desc  ? '<p class="card-desc">'  + esc(proj.desc)  + '</p>' : '') +
        buildTags(proj.tags) +
      '</div>';
    }

    card.innerHTML =
      '<div class="card-img-wrap">' +
        '<img class="card-img" src="' + proj.src + '" alt="' + esc(proj.title || '') + '" loading="lazy">' +
        '<div class="card-overlay">' +
          '<svg class="card-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<circle cx="11" cy="11" r="8"/>' +
            '<line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
            '<line x1="11" y1="8" x2="11" y2="14"/>' +
            '<line x1="8" y1="11" x2="14" y2="11"/>' +
          '</svg>' +
        '</div>' +
      '</div>' + bodyHtml;

    var capturedIdx = idx;
    card.addEventListener('click', function () { openLightbox(capturedIdx); });
    return card;
  }

  /* ── ТЕГИ ──────────────────────────────────────────────── */
  function buildTags(tags) {
    if (!tags || !tags.length) return '';
    var cat = detectCategory();
    var filters = (cat && CATEGORIES[cat]) ? CATEGORIES[cat].filters : {};
    var html = '<div class="card-tags">';
    for (var i = 0; i < tags.length; i++) {
      html += '<span class="card-tag">' + esc(filters[tags[i]] || tags[i]) + '</span>';
    }
    return html + '</div>';
  }

  /* ── ПУСТАЯ ГАЛЕРЕЯ ────────────────────────────────────── */
  function showEmpty() {
    var grid  = document.getElementById('galleryGrid');
    var empty = document.getElementById('galleryEmpty');
    if (grid)  grid.innerHTML = '';
    if (empty) empty.classList.add('show');
  }

  /* ── INTERSECTION OBSERVER ─────────────────────────────── */
  function observeCards() {
    var cards = document.querySelectorAll('.gallery-card');
    if (!window.IntersectionObserver) {
      for (var i = 0; i < cards.length; i++) cards[i].classList.add('visible');
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    for (var i = 0; i < cards.length; i++) obs.observe(cards[i]);
  }

  /* ── ФИЛЬТРЫ ───────────────────────────────────────────── */
  function buildFilterButtons(filters) {
    var wrap = document.getElementById('galleryFilter') || document.getElementById('filterButtons');
    if (!wrap) return;
    wrap.innerHTML = '';

    var allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'Все работы';
    wrap.appendChild(allBtn);

    Object.keys(filters).forEach(function (key) {
      var btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = key;
      btn.textContent = filters[key];
      wrap.appendChild(btn);
    });
  }

  function initFilters() {
    var wrap = document.getElementById('galleryFilter') || document.getElementById('filterButtons');
    if (!wrap) return;
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.filter-btn') : e.target;
      if (!btn || !btn.classList.contains('filter-btn')) return;
      wrap.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  }

  function applyFilter(filter) {
    var filtered = filter === 'all' ? allProjects :
      allProjects.filter(function (p) { return p.tags && p.tags.indexOf(filter) !== -1; });
    currentProjects = filtered;
    renderGrid(filtered);
  }

  /* ── ЛАЙТБОКС ─────────────────────────────────────────── */
  function initLightbox() {
    if (!document.getElementById('lightbox')) {
      document.body.appendChild(createLightboxDOM());
    }
  }

  function createLightboxDOM() {
    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML =
      '<div class="lb-backdrop"></div>' +
      '<button class="lb-close" aria-label="Закрыть">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
        '</svg>' +
      '</button>' +
      '<button class="lb-prev" aria-label="Назад">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<div class="lb-track"><img class="lb-img" src="" alt=""></div>' +
      '<button class="lb-next" aria-label="Далее">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>' +
      '<div class="lb-caption">' +
        '<p class="lb-title"></p>' +
        '<p class="lb-desc"></p>' +
        '<p class="lb-counter"></p>' +
      '</div>';

    lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-prev').addEventListener('click', function () { navigateLb(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { navigateLb(1); });

    document.addEventListener('keydown', function (e) {
      var lb2 = document.getElementById('lightbox');
      if (!lb2 || !lb2.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigateLb(-1);
      if (e.key === 'ArrowRight') navigateLb(1);
    });

    lb.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navigateLb(diff > 0 ? 1 : -1);
    }, { passive: true });

    return lb;
  }

  function openLightbox(idx) {
    lightboxIndex = idx;
    var lb = document.getElementById('lightbox');
    if (!lb) { lb = createLightboxDOM(); document.body.appendChild(lb); }
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    showLbImage(lightboxIndex);
  }

  function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLb(dir) {
    if (!currentProjects.length) return;
    lightboxIndex = (lightboxIndex + dir + currentProjects.length) % currentProjects.length;
    showLbImage(lightboxIndex);
  }

  function showLbImage(idx) {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var proj = currentProjects[idx];
    if (!proj) return;

    var img     = lb.querySelector('.lb-img');
    var titleEl = lb.querySelector('.lb-title');
    var descEl  = lb.querySelector('.lb-desc');
    var counter = lb.querySelector('.lb-counter');

    img.style.opacity   = '0';
    img.style.transform = 'scale(.97)';

    var tempImg = new Image();
    tempImg.onload = function () {
      img.src = proj.src;
      img.alt = proj.title || '';
      setTimeout(function () {
        img.style.transition = 'opacity .3s ease, transform .3s ease';
        img.style.opacity    = '1';
        img.style.transform  = 'scale(1)';
      }, 10);
    };
    tempImg.onerror = function () { img.src = proj.src; img.style.opacity = '1'; };
    tempImg.src = proj.src;

    if (titleEl) titleEl.textContent = proj.title || '';
    if (descEl)  descEl.textContent  = proj.desc  || '';
    if (counter) counter.textContent = (idx + 1) + ' / ' + currentProjects.length;

    var hidden = currentProjects.length <= 1;
    var prevBtn = lb.querySelector('.lb-prev');
    var nextBtn = lb.querySelector('.lb-next');
    if (prevBtn) prevBtn.style.display = hidden ? 'none' : '';
    if (nextBtn) nextBtn.style.display = hidden ? 'none' : '';
  }

  /* ── СЧЁТЧИК ───────────────────────────────────────────── */
  function animateCounter(total) {
    var el = document.getElementById('stat-count');
    if (!el) return;
    if (total === 0) { el.textContent = '0+'; return; }
    var cur = 0;
    var step = Math.max(1, Math.ceil(total / 30));
    var t = setInterval(function () {
      cur += step;
      if (cur >= total) { cur = total; clearInterval(t); }
      el.textContent = cur + '+';
    }, 40);
  }

  /* ── МОБИЛЬНОЕ МЕНЮ ────────────────────────────────────── */
  function initMenuToggle() {
    var btn = document.querySelector('.menu-toggle') || document.querySelector('.menu-btn');
    var nav = document.querySelector('.mobile-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ── ESCAPE HTML ───────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
