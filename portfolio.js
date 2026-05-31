/* ============================================================
   PORTFOLIO.JS — движок галереи Феликс ДВ v2.1
   ============================================================ */

(function () {
  'use strict';

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

  var allProjects     = [];
  var currentProjects = [];

  function detectCategory() {
    var path = window.location.pathname;
    var keys = Object.keys(CATEGORIES);
    for (var i = 0; i < keys.length; i++) {
      if (path.indexOf(keys[i]) !== -1) return keys[i];
    }
    return (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.category) || null;
  }

  function manifestPath(category) {
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    return isInPages
      ? '../assets/projects/' + category + '.json'
      : 'assets/projects/' + category + '.json';
  }

  function baseDir(category) {
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    return isInPages
      ? '../assets/projects/' + category + '/'
      : 'assets/projects/' + category + '/';
  }

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

  /* ── КАРТОЧКА БЕЗ ЛУПЫ И БЕЗ КЛИКА ───────────────────── */
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
      '</div>' + bodyHtml;

    return card;
  }

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

  function showEmpty() {
    var grid  = document.getElementById('galleryGrid');
    var empty = document.getElementById('galleryEmpty');
    if (grid)  grid.innerHTML = '';
    if (empty) empty.classList.add('show');
  }

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

  function initMenuToggle() {
    var btn = document.querySelector('.menu-toggle') || document.querySelector('.menu-btn');
    var nav = document.querySelector('.mobile-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
