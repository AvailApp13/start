
const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

const phone = document.getElementById('phone');
if (phone) {
  phone.addEventListener('input', () => {
    let digits = phone.value.replace(/\D/g, '');
    if (!digits.startsWith('7')) digits = '7' + digits.replace(/^7?/, '');
    digits = digits.slice(0, 11);

    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
    phone.value = formatted;
  });
}

const methodInput = document.getElementById('contactMethod');
document.querySelectorAll('.method-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.method-btn').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    methodInput.value = btn.dataset.value;
  });
});

const form = document.getElementById('leadForm');
const msg = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const phoneValue = document.getElementById('phone').value.trim();
    const contactMethod = document.getElementById('contactMethod').value.trim();
    const note = document.getElementById('note').value.trim();
    const digits = phoneValue.replace(/\D/g, '');

    if (!fullname || !contactMethod || !phoneValue.startsWith('+7') || digits.length !== 11) {
      msg.textContent = 'Проверьте форму: укажите ФИО, телефон с +7 и желаемый формат связи.';
      msg.className = 'form-message show error';
      return;
    }

    const whatsappNumber = '79140698485';
    const lines = [
      'Заявка с сайта',
      '',
      `ФИО: ${fullname}`,
      `Телефон: ${phoneValue}`,
      `Желаемый формат связи: ${contactMethod}`,
      `Примечание: ${note || '—'}`
    ];

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    msg.textContent = 'Открываем WhatsApp с готовой заявкой...';
    msg.className = 'form-message show ok';

    window.open(url, '_blank');
  });
}
