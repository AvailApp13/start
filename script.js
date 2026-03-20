const phoneInput = document.getElementById('phoneInput');
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '');
  let normalized = digits;

  if (!normalized.startsWith('7')) {
    if (normalized.startsWith('8')) {
      normalized = '7' + normalized.slice(1);
    } else {
      normalized = '7' + normalized.replace(/^7?/, '');
    }
  }

  normalized = normalized.slice(0, 11);
  let out = '+7';
  if (normalized.length > 1) out += ' (' + normalized.slice(1, 4);
  if (normalized.length >= 4) out += ') ' + normalized.slice(4, 7);
  if (normalized.length >= 7) out += '-' + normalized.slice(7, 9);
  if (normalized.length >= 9) out += '-' + normalized.slice(9, 11);
  return out;
}

if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.trim()) phoneInput.value = '+7';
  });

  phoneInput.addEventListener('keydown', (e) => {
    if ((phoneInput.selectionStart || 0) <= 2 && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      phoneInput.value = '+7';
    }
  });
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage || 'Скопировано');
  } catch (e) {
    showToast('Не удалось скопировать автоматически');
  }
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    await copyText(button.dataset.copy, `Скопировано: ${button.dataset.copy}`);
  });
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const contactType = (data.get('contactType') || '').toString();
  const message = (data.get('message') || '').toString().trim();
  const digits = phone.replace(/\D/g, '');

  if (!name) {
    formNote.textContent = 'Введите ФИО.';
    return;
  }

  if (!digits.startsWith('7') || digits.length !== 11) {
    formNote.textContent = 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX.';
    showToast('Проверьте формат телефона');
    return;
  }

  const leadMessage = [
    'Новая заявка с сайта FelixDV',
    `ФИО: ${name}`,
    `Телефон: ${phone}`,
    `Формат связи: ${contactType}`,
    `Примечание: ${message || '—'}`
  ].join('\n');

  if (contactType === 'whatsapp') {
    const url = `https://wa.me/79140698485?text=${encodeURIComponent(leadMessage)}`;
    window.open(url, '_blank', 'noopener');
    formNote.textContent = 'Открыли WhatsApp с подготовленным сообщением.';
    showToast('WhatsApp открыт');
    return;
  }

  if (contactType === 'call') {
    await copyText(leadMessage, 'Текст заявки скопирован');
    window.location.href = 'tel:+79140698485';
    formNote.textContent = 'Текст заявки скопирован. Сейчас откроется звонок.';
    return;
  }

  if (contactType === 'telegram') {
    await copyText(leadMessage + '\n\nНомер для связи: +7 914 069 84 85', 'Заявка и номер скопированы для Telegram');
    window.open('https://t.me/share/url?url=&text=' + encodeURIComponent(leadMessage), '_blank', 'noopener');
    formNote.textContent = 'Заявка скопирована. Открылся Telegram Share — можно быстро отправить сообщение.';
    return;
  }

  if (contactType === 'max') {
    await copyText(leadMessage + '\n\nMAX: +7 914 713 96 26', 'Заявка и номер скопированы для MAX');
    formNote.textContent = 'Заявка и номер скопированы для MAX. Вставьте сообщение в приложение.';
    return;
  }
});
