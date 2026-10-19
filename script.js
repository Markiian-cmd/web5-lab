(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const themeAuto = document.querySelector('#theme-auto');
  let manualTheme = false;

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.textContent = dark ? 'Світла тема' : 'Темна тема';
    themeToggle.setAttribute('aria-label', dark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
    themeAuto.hidden = !manualTheme;
  }

  function applyTimeTheme() {
    if (manualTheme) return;
    const hour = new Date().getHours();
    applyTheme(hour < 7 || hour >= 21);
  }

  themeToggle.addEventListener('click', () => {
    manualTheme = true;
    applyTheme(!root.classList.contains('dark'));
  });

  themeAuto.addEventListener('click', () => {
    manualTheme = false;
    applyTimeTheme();
  });

  applyTimeTheme();
  window.setInterval(applyTimeTheme, 60000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) applyTimeTheme();
  });

  function getSystemInfo() {
    const userAgent = navigator.userAgent;
    let operatingSystem = navigator.userAgentData?.platform || navigator.platform || 'Невідомо';
    if (/Windows/i.test(userAgent)) operatingSystem = 'Windows';
    else if (/Android/i.test(userAgent)) operatingSystem = 'Android';
    else if (/iPhone|iPad|iPod/i.test(userAgent)) operatingSystem = 'iOS / iPadOS';
    else if (/Macintosh|Mac OS X/i.test(userAgent)) operatingSystem = 'macOS';
    else if (/CrOS/i.test(userAgent)) operatingSystem = 'ChromeOS';
    else if (/Linux/i.test(userAgent)) operatingSystem = 'Linux';

    let browser = 'Інший браузер';
    if (/Edg\//i.test(userAgent)) browser = 'Microsoft Edge';
    else if (/OPR\//i.test(userAgent)) browser = 'Opera';
    else if (/Firefox\//i.test(userAgent)) browser = 'Firefox';
    else if (/Chrome\//i.test(userAgent)) browser = 'Chrome';
    else if (/Safari\//i.test(userAgent)) browser = 'Safari';

    return {
      browser,
      operatingSystem,
      userAgent,
      platform: navigator.platform || 'Недоступно',
      language: navigator.language,
      languages: [...navigator.languages],
      cookiesEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency ?? null,
      deviceMemory: navigator.deviceMemory ?? null,
      screen: {
        width: screen.width,
        height: screen.height,
        availableWidth: screen.availWidth,
        availableHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
      },
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      capturedAt: new Date().toISOString(),
    };
  }

  const systemInfo = getSystemInfo();
  const storageEntries = document.querySelector('#storage-entries');
  const storageStatus = document.querySelector('#storage-status');
  let systemInfoSaved = false;
  document.querySelector('#system-summary').textContent = `${systemInfo.browser} · ${systemInfo.operatingSystem} · ${systemInfo.language}`;

  function appendStorageEntry(key, value) {
    const entry = document.createElement('div');
    entry.className = 'storage-entry';
    const label = document.createElement('dt');
    label.textContent = key;
    const description = document.createElement('dd');
    const content = document.createElement('pre');
    try {
      content.textContent = JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      content.textContent = value;
    }
    description.append(content);
    entry.append(label, description);
    storageEntries.append(entry);
  }

  function renderStorage() {
    storageEntries.replaceChildren();
    try {
      const storage = window.localStorage;
      const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index));
      keys.filter((key) => key !== null).sort().forEach((key) => {
        appendStorageEntry(key, storage.getItem(key) ?? '');
      });
      storageStatus.textContent = keys.length
        ? 'Нижче показано всі записи localStorage для цієї сторінки.'
        : 'У localStorage поки немає записів.';
      if (!systemInfoSaved) {
        storageStatus.textContent += ' Нові дані системи не вдалося зберегти; вони доступні лише в поточному сеансі.';
        appendStorageEntry('Інформація про систему поточного сеансу', JSON.stringify(systemInfo));
      }
    } catch {
      storageStatus.textContent = 'Браузер заборонив доступ до localStorage. Дані системи доступні лише в поточному сеансі.';
      appendStorageEntry('Інформація про систему', JSON.stringify(systemInfo));
    }
  }

  try {
    window.localStorage.setItem('lab4.systemInfo', JSON.stringify(systemInfo));
    systemInfoSaved = true;
  } catch {
    systemInfoSaved = false;
  }
  renderStorage();
  window.addEventListener('storage', renderStorage);

  const reviewsList = document.querySelector('#reviews-list');
  const reviewsStatus = document.querySelector('#reviews-status');
  const reviewsRetry = document.querySelector('#reviews-retry');
  let reviewsLoading = false;

  async function loadReviews() {
    if (reviewsLoading) return;
    reviewsLoading = true;
    reviewsList.replaceChildren();
    reviewsList.setAttribute('aria-busy', 'true');
    reviewsStatus.textContent = 'Завантажую відгуки…';
    reviewsStatus.dataset.state = 'loading';
    reviewsRetry.hidden = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/7/comments', {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Не вдалося отримати відгуки.');
      const reviews = await response.json();
      if (!Array.isArray(reviews) || reviews.some((review) =>
        !review || !['name', 'email', 'body'].every((key) => typeof review[key] === 'string')
      )) throw new Error('Сервер повернув некоректні дані.');

      const fragment = document.createDocumentFragment();
      reviews.forEach((review) => {
        const card = document.createElement('article');
        card.className = 'card review-card';
        const heading = document.createElement('h3');
        heading.textContent = review.name;
        const email = document.createElement('p');
        email.className = 'review-email';
        email.textContent = review.email;
        const body = document.createElement('p');
        body.className = 'review-body';
        body.textContent = review.body;
        card.append(heading, email, body);
        fragment.append(card);
      });
      reviewsList.append(fragment);
      reviewsStatus.textContent = reviews.length ? `Завантажено відгуків: ${reviews.length}.` : 'Відгуків поки немає.';
      reviewsStatus.dataset.state = 'success';
    } catch {
      reviewsStatus.textContent = 'Не вдалося завантажити відгуки. Перевірте з’єднання та спробуйте ще раз.';
      reviewsStatus.dataset.state = 'error';
      reviewsRetry.hidden = false;
    } finally {
      window.clearTimeout(timeout);
      reviewsList.setAttribute('aria-busy', 'false');
      reviewsLoading = false;
    }
  }

  reviewsRetry.addEventListener('click', loadReviews);
  loadReviews();

  const dialog = document.querySelector('#contact-dialog');
  const contactForm = document.querySelector('#contact-form');
  const contactStatus = document.querySelector('#contact-status');
  const contactSubmit = document.querySelector('#contact-submit');
  const formInputs = [...contactForm.querySelectorAll('input, textarea')];
  let previousFocus = null;
  let sending = false;
  let contactTimer;

  function openContact() {
    window.clearTimeout(contactTimer);
    if (dialog.open) return;
    previousFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('modal-open');
    const firstInput = formInputs.find((input) => !input.disabled);
    (firstInput || document.querySelector('#contact-close')).focus();
  }

  function closeContact() {
    if (dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-open-contact]').forEach((button) => {
    button.addEventListener('click', openContact);
  });
  document.querySelector('#contact-close').addEventListener('click', closeContact);
  document.querySelector('#contact-cancel').addEventListener('click', closeContact);
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeContact();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeContact();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  contactTimer = window.setTimeout(openContact, 60000);

  formInputs.forEach((input) => {
    input.addEventListener('input', () => input.setCustomValidity(''));
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    formInputs.forEach((input) => {
      input.value = input.value.trim();
      input.setCustomValidity(input.value ? '' : 'Заповніть це поле.');
    });
    const phoneInput = document.querySelector('#contact-phone');
    if (phoneInput.value) {
      const digitCount = phoneInput.value.replace(/\D/g, '').length;
      const validPhone = /^[+\d\s().-]+$/.test(phoneInput.value) && digitCount >= 7 && digitCount <= 15;
      phoneInput.setCustomValidity(validPhone ? '' : 'Введіть телефон із 7–15 цифр. Можна використовувати +, пробіли, дужки, крапки та дефіси.');
    }
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    sending = true;
    contactForm.setAttribute('aria-busy', 'true');
    formInputs.forEach((input) => { input.disabled = true; });
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Надсилаю…';
    contactStatus.textContent = 'Надсилаю ваше повідомлення…';
    contactStatus.dataset.state = 'loading';
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Надсилання не вдалося.');
      contactStatus.textContent = 'Повідомлення надіслано. Дякую за зворотний зв’язок!';
      contactStatus.dataset.state = 'success';
      contactForm.reset();
    } catch {
      contactStatus.textContent = 'Не вдалося підтвердити надсилання. Перевірте з’єднання та спробуйте ще раз. Введені дані збережено у формі.';
      contactStatus.dataset.state = 'error';
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      contactForm.setAttribute('aria-busy', 'false');
      formInputs.forEach((input) => { input.disabled = false; });
      contactSubmit.disabled = false;
      contactSubmit.textContent = 'Надіслати';
    }
  });
})();
