const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const phoneInput = document.getElementById('phoneInput');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');
    if (!value.startsWith('7')) value = '7' + value.replace(/^7?/, '');
    value = value.slice(0, 11);
    let out = '+7';
    if (value.length > 1) out += ' (' + value.slice(1, 4);
    if (value.length >= 4) out += ') ' + value.slice(4, 7);
    if (value.length >= 7) out += '-' + value.slice(7, 9);
    if (value.length >= 9) out += '-' + value.slice(9, 11);
    phoneInput.value = out;
  });
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.trim()) phoneInput.value = '+7';
  });
}

const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const phone = phoneInput.value.replace(/\D/g, '');
    if (phone.length !== 11 || !phone.startsWith('7')) {
      phoneInput.focus();
      phoneInput.style.borderColor = '#d65252';
      setTimeout(() => { phoneInput.style.borderColor = ''; }, 1400);
      return;
    }
    success.hidden = false;
    form.reset();
    phoneInput.value = '+7';
    setTimeout(() => { success.hidden = true; }, 5000);
  });
}

const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.title;
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = card.dataset.text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

modal?.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.close === 'true') {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});
