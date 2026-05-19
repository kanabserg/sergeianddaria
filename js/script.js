
// ===== КОНФИГУРАЦИЯ =====
// ✏️ РЕДАКТИРУЙТЕ ЭТИ ЗНАЧЕНИЯ ПОД СВОЮ СВАДЬБУ

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
  const params = new URLSearchParams(window.location.search);
  const gender = params.get("g") || "";
  if (gender === "m")  return "Дорогой";
  if (gender === "f")  return "Дорогая";
  if (gender === "mf") return "Дорогие";
  return "Дорогой(ая)";
}

function applyConfig() {
  // Имена пары
  document.getElementById("hero-bride").textContent = CONFIG.bride;
  document.getElementById("hero-groom").textContent = CONFIG.groom;
  document.getElementById("footer-bride").textContent = CONFIG.bride;
  document.getElementById("footer-groom").textContent = CONFIG.groom;

  // Даты
  document.getElementById("hero-date-display").textContent = CONFIG.dateDisplay;
  document.getElementById("date-big").textContent = "июль 2026";
  document.getElementById("footer-date").textContent = CONFIG.dateDisplay;
  document.getElementById("rsvp-deadline").textContent = CONFIG.rsvpDeadline;

  // Место
  document.getElementById("venue-name").textContent = CONFIG.venueName;
  document.getElementById("venue-address").innerHTML = CONFIG.venueAddress.replace("\n","<br>");
  document.getElementById("map-link").href = CONFIG.mapUrl;

  // Приветствие гостя
  document.getElementById("guest-greeting").textContent = getGenderGreeting();

  // Имя гостя
  const guestName = getGuestName();
  if (guestName) {
    document.getElementById("guest-name-display").textContent = guestName;
    document.getElementById("f-name").value = guestName;
  } else {
    document.getElementById("guest-name-display").textContent = "Дорогой гость";
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

  document.querySelector("#cd-days  + .countdown-label").textContent = plural(days,  "день",   "дня",    "дней");
  document.querySelector("#cd-hours + .countdown-label").textContent = plural(hours, "час",    "часа",   "часов");
  document.querySelector("#cd-mins  + .countdown-label").textContent = plural(mins,  "минута", "минуты", "минут");
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
    btn.textContent = "Отправляем...";

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

    try {
      // ✏️ Замените URL на ваш Google Apps Script
      await fetch(CONFIG.googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn("Fetch error (возможно, всё ок с no-cors):", err);
    }

    // Показываем успех плавно
    form.style.transition = "opacity 0.5s ease";
    form.style.opacity = "0";
    setTimeout(() => {
      form.style.display = "none";
      const successEl = document.getElementById("form-success");
      successEl.style.display = "block";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          successEl.classList.add("visible");
        });
      });
    }, 500);
  });
}

// ===== HERO ENTRANCE =====
function heroEntrance() {
  // Hero уже анимируется через CSS, делаем visible сразу
  document.querySelectorAll("#hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 200);
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  createPetals();
  heroEntrance();
  setTimeout(initReveal, 100);
  initFamilyToggle();
  initForm();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('envelope-open');
    const overlay     = document.getElementById('envelope-overlay');
    const centerGroup = document.getElementById('env-center-group');

    const audio = new Audio('audio/Sleeping At Last Turning Page.mp3');
    audio.loop = true;

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
    overlay.addEventListener('click', openEnvelope); // tap anywhere works too
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
  arrowTimer = setTimeout(scheduleArrows, 3000);
}

function initArrowObserver() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const observer = new IntersectionObserver((entries) => {
    heroInView = entries[0].isIntersecting;
    if (heroInView && !arrowTimer) scheduleArrows();
  }, { threshold: 0 });
  observer.observe(hero);
}