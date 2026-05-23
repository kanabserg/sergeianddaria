
// ===== ЯЗЫК =====
const currentLang = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "ru";

// ===== ПЕРЕВОДЫ =====
const TRANSLATIONS = {
  ru: {
    pageTitle: "Приглашение на свадьбу",
    scrollLabel: "Листать",
    dateBig: "июль 2026",
    calMon: "пн", calTue: "вт", calWed: "ср", calThu: "чт", calFri: "пт", calSat: "сб", calSun: "вс",
    locationSubtitle: "save the place",
    locationTitle: "Место торжества",
    mapLink: "Посмотреть на карте",
    timelineSubtitle: "День торжества",
    timelineTitle: "Программа дня",
    t1desc: "Сбор гостей<br>Cocktail reception",
    t2desc: "Торжественная регистрация<br>брака",
    t3desc: "Начало банкета<br>Поздравления",
    t4desc: "Торт и сладкий стол<br>Первый танец",
    t5desc: "Завершение вечера<br>Трансфер",
    transferNote: "Дополнительно сообщим время и точку сбора трансфера,<br>который доставит вас до площадки",
    countdownSubtitle: "Осталось совсем немного",
    countdownTitle: "До нашей свадьбы",
    cdDays1: "день",    cdDaysFew: "дня",    cdDaysMany: "дней",
    cdHours1: "час",    cdHoursFew: "часа",  cdHoursMany: "часов",
    cdMins1: "минута",  cdMinsFew: "минуты", cdMinsMany: "минут",
    cdSecs1: "секунда", cdSecsFew: "секунды",cdSecsMany: "секунд",
    dresscodeSubtitle: "Стиль вечера",
    dresscodeTitle: "Дресс-код — Cocktail",
    dresscodeText: "Для нас самое главное — ваше присутствие, но мы будем очень признательны, если для своих образов вы выберете цветовую гамму спокойных природных оттенков.",
    wishesTitle: "Пожелания",
    wishLabel1: "про подарки",
    wishText1: "Если Вы желаете поздравить нас по случаю праздника, мы будем признательны лёгким подаркам в конвертах, чтобы освободить ваши руки для объятий",
    wishLabel2: "про Ваш комфорт",
    wishText2: "Наш праздник пройдет на свежем воздухе, поэтому рекомендуем захватить с собой удобную обувь для танцев на траве и что-то теплое для вечерней программы, чтобы наслаждаться каждой минутой праздника без забот",
    wishLabel3: "про цветы",
    wishText3: "Пожалуйста, не дарите нам цветы, так как у нас не будет возможности в полной мере насладиться их красотой и ароматом",
    rsvpSubtitle: "Анкета гостя",
    rsvpTitle: "Подтвердите участие",
    rsvpIntroText: `Заполните небольшую анкету до <strong style="font-weight:600;font-size:19px;color:var(--rose-dark);">16 июня 2026</strong>,<br>это поможет нам в организации праздника.`,
    formNameLabel: "Ваше имя и фамилия *",
    formNamePlaceholder: "Иванова Мария",
    formAttendanceLabel: "Присутствие на торжестве *",
    attendanceSolo: "Я приду",
    attendanceCouple: "Мы придём вдвоём",
    attendanceFamily: "Придём семьёй",
    attendanceCant: "К сожалению, не смогу прийти",
    formFamilyLabel: "Имена тех, кто придёт с вами",
    formFamilyPlaceholder: "Иванов Пётр, Иванова Анна...",
    formAlcLabel: "Алкогольные напитки",
    alc1: "Шампанское", alc2: "Белое вино", alc3: "Красное вино", alc4: "Крепкий алкоголь", alc5: "Не пью",
    formWishesLabel: "Пожелания молодожёнам",
    formWishesPlaceholder: "Ваши тёплые слова...",
    submitBtn: "Отправить анкету",
    submitting: "Отправляем...",
    rsvpClosed: "Время Вышло!",
    successTitle: "Спасибо!",
    successText: "Ваша анкета отправлена. Мы очень ждём вас на нашем празднике!",
    contactsSubtitle: "Связаться с нами",
    contactsTitle: "Контакты",
    contactsText: "По любым вопросам до свадьбы и в день торжества<br>смело обращайтесь к нашим организаторам:",
    c1name: "Анастасия",
    c2name: "Виктория",
    c1role: "Организатор",
    c2role: "Координатор",
    envTopText: "Вам письмо!",
    envCenterLabel: "Нажми<br>сюда",
    envAddrLabelTo: "Для:",
    envAddrLabelFrom: "От:",
    envTo: "Родных и близких",
    envFrom: "Дарьи и Сергея",
    qrMessage: "Пожалуйста, откройте<br>приглашение с телефона",
    greetingM: "Дорогой", greetingF: "Дорогая", greetingMF: "Дорогие", greetingDefault: "Дорогой(ая)",
    defaultGuestName: "Дорогой гость",
    bride: "Дарья", groom: "Сергей",
    venueName: "Сады у Юлии",
    venueAddress: "поселок Коптев Овраг, 30\nВход со стороны Волги",
    introText: `Скоро состоится очень важное и радостное для нас событие —<br><strong style="font-family:'Betmo',cursive;font-size:1.8em;font-weight:normal;">наша свадьба!</strong><br><br>Этот день невозможно представить без самых близких для нас людей,<br>мы бы очень хотели, чтобы вы провели его вместе с нами!`,
  },
  en: {
    pageTitle: "Wedding Invitation",
    scrollLabel: "Scroll",
    dateBig: "July 2026",
    calMon: "Mo", calTue: "Tu", calWed: "We", calThu: "Th", calFri: "Fr", calSat: "Sa", calSun: "Su",
    locationSubtitle: "save the place",
    locationTitle: "Venue",
    mapLink: "View on map",
    timelineSubtitle: "Wedding Day",
    timelineTitle: "Day Schedule",
    t1desc: "Guest arrival<br>Cocktail reception",
    t2desc: "Wedding ceremony",
    t3desc: "Banquet begins<br>Congratulations",
    t4desc: "Wedding cake & desserts<br>First dance",
    t5desc: "End of evening<br>Transfer",
    transferNote: "We will inform you of the transfer pick-up time and location to take you to the venue",
    countdownSubtitle: "The wedding is",
    countdownTitle: "almost here",
    cdDays1: "day",    cdDaysFew: "days",    cdDaysMany: "days",
    cdHours1: "hour",  cdHoursFew: "hours",  cdHoursMany: "hours",
    cdMins1: "minute", cdMinsFew: "minutes", cdMinsMany: "minutes",
    cdSecs1: "second", cdSecsFew: "seconds", cdSecsMany: "seconds",
    dresscodeSubtitle: "Dress code",
    dresscodeTitle: "Dress Code — Cocktail",
    dresscodeText: "Most importantly, we simply want you there — but we would be delighted if you chose outfits in soft, natural tones.",
    wishesTitle: "Our Wishes",
    wishLabel1: "about gifts",
    wishText1: "If you would like to congratulate us with a gift, we would truly appreciate a contribution in an envelope, so your hands are free for hugs.",
    wishLabel2: "about your comfort",
    wishText2: "Our celebration will take place outdoors, so we recommend bringing comfortable shoes for dancing on the grass, as well as something warm for the evening, so you can enjoy every moment in comfort.",
     wishLabel3: "about flowers",
    wishText3: "Please do not bring flowers, as we won't have the opportunity to fully enjoy their beauty and fragrance.",
    rsvpSubtitle: "RSVP",
    rsvpTitle: "Confirm Attendance",
    rsvpIntroText: `Please fill in a short form by <strong style="font-weight:600;font-size:19px;color:var(--rose-dark);">June 16, 2026</strong>,<br>this will help us with the wedding planning.`,
    formNameLabel: "Your name *",
    formNamePlaceholder: "Jane Smith",
    formAttendanceLabel: "Attendance *",
    attendanceSolo: "I will attend",
    attendanceCouple: "We will attend as a couple",
    attendanceFamily: "We will attend as a family",
    attendanceCant: "Unfortunately, I cannot attend",
    formFamilyLabel: "Names of those joining you",
    formFamilyPlaceholder: "John Smith, Jane Smith...",
    formAlcLabel: "Alcoholic beverages",
    alc1: "Champagne", alc2: "White wine", alc3: "Red wine", alc4: "Spirits", alc5: "Non-drinker",
    formWishesLabel: "Message to the newlyweds",
    formWishesPlaceholder: "Your warm wishes...",
    submitBtn: "Submit RSVP",
    submitting: "Sending...",
    rsvpClosed: "Time's Up!",
    successTitle: "Thank you!",
    successText: "Your RSVP has been submitted. We look forward to celebrating with you!",
    contactsSubtitle: "Get in touch",
    contactsTitle: "Contacts",
    contactsText: "For any questions before the wedding and on the day,<br>please feel free to contact our organisers:",
    c1name: "Anastasia",
    c2name: "Viktoria",
    c1role: "Manager",
    c2role: "Coordinator",
    envTopText: "You've got mail!",
    envCenterLabel: "Tap<br>here",
    envAddrLabelTo: "To:",
    envAddrLabelFrom: "From:",
    envTo: "Our loved ones",
    envFrom: "Daria & Sergei",
    qrMessage: "Please open the invitation<br>on your phone",
    greetingM: "Dear", greetingF: "Dear", greetingMF: "Dear", greetingDefault: "Dear",
    defaultGuestName: "Dear Guest",
    bride: "Daria", groom: "Sergei",
    venueName: "Julia's Garden",
    venueAddress: "Russia, Koptev Ovrag, 30\nEntrance from Volga river side",
    introText: `Soon, the most important and joyful day of our lives will arrive —<br><strong style="font-family:'Betmo',cursive;font-size:1.8em;font-weight:normal;">our wedding!</strong><br><br>We cannot imagine this celebration without the people dearest to us, and we would love for you to share this special day with us.`,
  }
};

// ===== КОНФИГУРАЦИЯ =====

const CONFIG = {
  bride: "Дарья",
  groom: "Сергей",
  weddingDate: new Date("2026-07-23T15:00:00"), // дата и время свадьбы
  dateDisplay: "23 · 07 · 26",
  dateDay: "23",
  dateMonthYear: "июля 2026",
  venueName: "Сады у Юлии",
  venueAddress: "поселок Коптев Овраг, 30\nВход со стороны Волги",
  mapUrl: "https://yandex.ru/maps/?pt=50.19645,53.33628&z=16&l=map",
  rsvpDeadline: "16 июня 2026",
  rsvpBlurDate: new Date("2026-06-17"),
  // ✏️ Вставьте URL вашего Google Apps Script:
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbwkIPMohtIerS8YFguzomf0CuZ8_y_QKPyZfRO_W8pApc5SZTTjMqXrLTgbmovObmmQEg/exec",
  // ✏️ Секретный ключ — такой же должен быть в Apps Script:
  key: "sergei-daria-2026",
};

// ===== ПЕРСОНАЛИЗАЦИЯ ГОСТЯ =====
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("guest") || params.get("имя") || "";
}

function getGenderGreeting() {
  if (currentLang === "en") return "Dear";
  const params = new URLSearchParams(window.location.search);
  const gender = params.get("g") || "";
  if (gender === "m")  return "Дорогой";
  if (gender === "f")  return "Дорогая";
  if (gender === "mf") return "Дорогие";
  return "Дорогой(ая)";
}

function applyConfig() {
  const t = TRANSLATIONS[currentLang];

  // Имена пары
  const bride = t.bride || CONFIG.bride;
  const groom = t.groom || CONFIG.groom;
  document.getElementById("hero-bride").textContent = bride;
  document.getElementById("hero-groom").textContent = groom;
  document.getElementById("footer-bride").textContent = bride;
  document.getElementById("footer-groom").textContent = groom;

  // Даты
  document.getElementById("hero-date-display").textContent = CONFIG.dateDisplay;
  document.getElementById("footer-date").textContent = CONFIG.dateDisplay;

  // Место
  document.getElementById("venue-name").textContent = t.venueName || CONFIG.venueName;
  document.getElementById("venue-address").innerHTML = (t.venueAddress || CONFIG.venueAddress).replace("\n","<br>");
  document.getElementById("map-link").href = CONFIG.mapUrl;

  // Приветствие гостя
  document.getElementById("guest-greeting").textContent = getGenderGreeting();

  // Имя гостя
  const guestName = getGuestName();
  if (guestName) {
    document.getElementById("guest-name-display").textContent = guestName;
    document.getElementById("f-name").value = guestName;
  } else {
    document.getElementById("guest-name-display").textContent = TRANSLATIONS[currentLang].defaultGuestName;
  }
}

// ===== ОБРАТНЫЙ ОТСЧЁТ =====
function updateCountdown() {
  const now = new Date();
  const diff = CONFIG.weddingDate - now;

  if (diff <= 0) {
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-mins").textContent = "00";
    document.getElementById("cd-secs").textContent = "00";
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  // Склонение: возвращает нужную форму слова по числу
  function plural(n, one, few, many) {
    const mod10  = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  document.getElementById("cd-days").textContent  = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-mins").textContent  = String(mins).padStart(2, "0");
  document.getElementById("cd-secs").textContent  = String(secs).padStart(2, "0");

  const t = TRANSLATIONS[currentLang];
  document.querySelector("#cd-days  + .countdown-label").textContent = plural(days,  t.cdDays1,  t.cdDaysFew,  t.cdDaysMany);
  document.querySelector("#cd-hours + .countdown-label").textContent = plural(hours, t.cdHours1, t.cdHoursFew, t.cdHoursMany);
  document.querySelector("#cd-mins  + .countdown-label").textContent = plural(mins,  t.cdMins1,  t.cdMinsFew,  t.cdMinsMany);
  document.querySelector("#cd-secs  + .countdown-label").textContent = plural(secs,  t.cdSecs1,  t.cdSecsFew,  t.cdSecsMany);
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

// ===== PETALS =====
function createPetals() {
  const container = document.getElementById("petalContainer");
  const petals = ["🌸","🌺","✿","❀","🌹"];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (8 + Math.random() * 12) + "s";
    p.style.animationDelay = (Math.random() * 10) + "s";
    p.style.opacity = (0.2 + Math.random() * 0.4).toFixed(2);
    container.appendChild(p);
  }
}

// ===== SHOW/HIDE FAMILY FIELD =====
function initFamilyToggle() {
  document.querySelectorAll('input[name="attendance"]').forEach(r => {
    r.addEventListener("change", () => {
      const show = r.value === "Придём вдвоём" || r.value === "Придём семьёй";
      document.getElementById("family-row").style.display = show ? "block" : "none";
    });
  });
}

// ===== FORM SUBMIT → GOOGLE SHEETS =====
function initForm() {
  const form = document.getElementById("rsvp-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    btn.disabled = true;
    btn.textContent = TRANSLATIONS[currentLang].submitting;

    // Сбор данных
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || "";
    const alcohol = [...document.querySelectorAll('.checkbox-group input:checked')]
      .map(i => i.value).join(", ");

    const data = {
      key:         CONFIG.key,
      name:        document.getElementById("f-name").value,
      attendance,
      family:      document.getElementById("f-family").value,
      alcohol,
      wishes:      document.getElementById("f-wishes").value,
      guest_url:   getGuestName(),
      g:           new URLSearchParams(window.location.search).get("g") || "",
      timestamp:   new Date().toLocaleString("ru-RU")
    };

    fetch(CONFIG.googleScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(err => console.warn("Fetch error:", err));

    // Показываем успех через секунду, не дожидаясь ответа
    await new Promise(r => setTimeout(r, 1000));
    form.style.transition = "opacity 0.5s ease";
    form.style.opacity = "0";
    setTimeout(() => {
      const wrapper = document.getElementById("form-wrapper");
      wrapper.style.height = wrapper.offsetHeight + "px";

      form.style.display = "none";
      const successEl = document.getElementById("form-success");
      successEl.style.display = "block";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.style.height = successEl.offsetHeight + "px";
          setTimeout(() => successEl.classList.add("visible"), 500);
        });
      });
    }, 500);
  });
}

// ===== RSVP DEADLINE =====
function checkRsvpDeadline() {
  if (new Date() < CONFIG.rsvpBlurDate) return;
  const wrapper = document.getElementById('form-wrapper');
  const overlay = document.getElementById('rsvp-closed-overlay');
  if (wrapper) wrapper.classList.add('rsvp-closed');
  if (overlay) overlay.classList.add('visible');
}

// ===== HERO ENTRANCE =====
function heroEntrance() {
  // Hero уже анимируется через CSS, делаем visible сразу
  document.querySelectorAll("#hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 200);
  });
}

// ===== ПЕРЕВОДЫ: ПРИМЕНЕНИЕ =====
function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  document.title = t.pageTitle;
  document.documentElement.lang = currentLang;

  // data-i18n → textContent
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });

  // data-i18n-html → innerHTML
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = t[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });

  // data-i18n-placeholder → placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const v = t[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });

  const setText = (id, key) => { const el = document.getElementById(id); if (el && t[key] !== undefined) el.textContent = t[key]; };
  const setHTML = (id, key) => { const el = document.getElementById(id); if (el && t[key] !== undefined) el.innerHTML = t[key]; };

  setHTML("intro-main-text",   "introText");
  setHTML("rsvp-intro-text",   "rsvpIntroText");
  setHTML("t1-desc",           "t1desc");
  setHTML("t2-desc",           "t2desc");
  setHTML("t3-desc",           "t3desc");
  setHTML("t4-desc",           "t4desc");
  setHTML("t5-desc",           "t5desc");
  setHTML("transfer-note-text","transferNote");
  setText("dresscode-text",    "dresscodeText");
  setHTML("contacts-text",     "contactsText");
  setText("rsvp-closed-text",  "rsvpClosed");
  setHTML("qr-message",        "qrMessage");
  setText("env-top-text",      "envTopText");
  setHTML("env-center-label",  "envCenterLabel");
  setText("env-to",            "envTo");
  setText("env-from",          "envFrom");
  setText("map-link",          "mapLink");
  setText("submit-btn",        "submitBtn");
  setText("c1-name",           "c1name");
  setText("c2-name",           "c2name");
  setText("c1-role",           "c1role");
  setText("c2-role",           "c2role");
  setText("date-big",          "dateBig");

  const successEl = document.getElementById("form-success");
  if (successEl) {
    const h3 = successEl.querySelector("h3");
    const p  = successEl.querySelector("p");
    if (h3) h3.textContent = t.successTitle;
    if (p)  p.textContent  = t.successText;
  }
}

// ===== QR CODE =====
function initQrCode() {
  new QRCode(document.getElementById("qr-canvas"), {
    text: window.location.href,
    width: 160,
    height: 160,
    colorDark: "#3D3F24",
    colorLight: "#F5F0E8",
    correctLevel: QRCode.CorrectLevel.M
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.setProperty('--initial-height', window.innerHeight + 'px');
  applyTranslations();
  applyConfig();
  initQrCode();
  createPetals();
  heroEntrance();
  setTimeout(initReveal, 100);
  initFamilyToggle();
  initForm();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  checkRsvpDeadline();
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('envelope-open');
    const overlay     = document.getElementById('envelope-overlay');
    const centerGroup = document.getElementById('env-center-group');

    const audio = new Audio('audio/Sleeping At Last Turning Page.mp3');
    audio.loop = true;

    const muteBtn = document.getElementById('mute-btn');
    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      document.getElementById('mute-icon-on').style.display  = audio.muted ? 'none'  : '';
      document.getElementById('mute-icon-off').style.display = audio.muted ? ''      : 'none';
    });
    let envelopeOpened = false;
    function openEnvelope() {
      if (envelopeOpened) return;
      envelopeOpened = true;
      audio.play().catch(() => {});
      overlay.classList.add('opening');
      setTimeout(() => {
        overlay.classList.add('gone');
        document.body.classList.add('envelope-open');
        setTimeout(() => {
          overlay.remove();
          initArrowObserver();
          setTimeout(scheduleArrows, 600);
        }, 500);
      }, 2100);
    }

    centerGroup.addEventListener('click', openEnvelope);
  });

// ===== CUPID ARROWS =====
let heroInView = true;
let arrowTimer = null;

function createCupidArrow() {
  const container = document.getElementById('arrowContainer');
  const hero      = document.getElementById('hero');
  if (!container || !hero) return;

  const W      = window.innerWidth;
  const heroTop = hero.offsetTop;
  const heroH   = hero.offsetHeight;

  const img = document.createElement('img');
  img.src = 'img/cupid-arrow.svg';
  img.classList.add('cupid-arrow');
  img.style.width = '90px';
  img.style.height = 'auto';

  const isLTR  = Math.random() > 0.5;
  const startY = heroTop + 0.15 * heroH + Math.random() * 0.7 * heroH;
  const endY   = heroTop + 0.15 * heroH + Math.random() * 0.7 * heroH;
  const peakY  = Math.max(heroTop, startY - (0.2 + Math.random() * 0.25) * heroH);

  const path = isLTR
    ? `M -90 ${startY} Q ${W/2} ${peakY} ${W+90} ${endY}`
    : `M ${W+90} ${startY} Q ${W/2} ${peakY} -90 ${endY}`;

  const duration = 1 + Math.random() * 0.75;

  img.style.cssText += `;offset-path:path('${path}');offset-rotate:auto;animation:arrowFlight ${duration}s linear forwards;`;
  container.appendChild(img);
  setTimeout(() => img.remove(), (duration + 0.3) * 1000);
}

function scheduleArrows() {
  arrowTimer = null;
  if (!heroInView) return;
  createCupidArrow();
  arrowTimer = setTimeout(scheduleArrows, 2000 + Math.random() * 1000);
}

function initArrowObserver() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let prevVisible = true;
  const observer = new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    heroInView = visible;
    if (visible && !prevVisible && !arrowTimer) scheduleArrows();
    prevVisible = visible;
  }, { threshold: 0 });
  observer.observe(hero);
}