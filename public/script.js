/* ══════════════════════════════════════════════════════════
   WEDDING INVITATION — script.js
══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   CONFIGURATION — update these values
───────────────────────────────────────────────────────── */
const WEDDING_DATE = new Date("2026-04-05T10:00:00"); // ← replace with actual date

/* ─────────────────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────────────────── */
const loadingScreen = document.getElementById("loading-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    loadingScreen.addEventListener(
      "transitionend",
      () => loadingScreen.remove(),
      { once: true }
    );
  }, 1200);
});

/* ─────────────────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");

  let W, H, particles;

  const CONFIG = {
    count: 55,
    sizeMin: 2,
    sizeMax: 5,
    speedMin: 0.15,
    speedMax: 0.45,
    colors: ["#c8a98a", "#d4b89a", "#e8d5c4", "#b89070", "#a07858"],
    shapes: ["circle", "heart"],
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function heartPath(ctx, x, y, size) {
    const s = size * 0.7;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s * 1.1, -s * 0.6, -s * 2.2, s * 0.5, 0, s * 1.4);
    ctx.bezierCurveTo(s * 2.2, s * 0.5, s * 1.1, -s * 0.6, 0, s * 0.3);
    ctx.closePath();
    ctx.restore();
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: CONFIG.sizeMin + Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin),
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
      shape: CONFIG.shapes[Math.floor(Math.random() * CONFIG.shapes.length)],
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(CONFIG.speedMin + Math.random() * (CONFIG.speedMax - CONFIG.speedMin)),
      opacity: 0.15 + Math.random() * 0.45,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.012,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      p.wobble += p.wobbleSpeed;
      const wx = p.x + Math.sin(p.wobble) * 1.5;

      if (p.shape === "heart") {
        heartPath(ctx, wx, p.y, p.size);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(wx, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      p.y += p.vy;
      p.x += p.vx;

      // Reset when off screen
      if (p.y < -20) {
        p.y = H + 20;
        p.x = Math.random() * W;
      }
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    particles.forEach((p) => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  });

  init();
  draw();
})();

/* ─────────────────────────────────────────────────────────
   PARALLAX SCROLLING
───────────────────────────────────────────────────────── */
(function initParallax() {
  const parallaxBgs = document.querySelectorAll(".parallax-bg");

  function onScroll() {
    parallaxBgs.forEach((bg) => {
      const section = bg.parentElement;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewH) return;

      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 80; // px shift range
      bg.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ─────────────────────────────────────────────────────────
   SCROLL FADE  (IntersectionObserver)
───────────────────────────────────────────────────────── */
(function initScrollFade() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────────
   COUNTDOWN TIMER
───────────────────────────────────────────────────────── */
(function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-minutes");
  const secsEl = document.getElementById("cd-seconds");

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function tick() {
    const diff = WEDDING_DATE - Date.now();

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = "00";
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    daysEl.textContent  = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(mins);
    secsEl.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────────────────────
   MUSIC TOGGLE
───────────────────────────────────────────────────────── */
(function initMusic() {
  const btn       = document.getElementById("music-toggle");
  const audio     = document.getElementById("bg-music");
  const iconOn    = document.getElementById("music-icon-on");
  const iconOff   = document.getElementById("music-icon-off");
  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      iconOn.style.display  = "block";
      iconOff.style.display = "none";
      btn.classList.remove("playing");
      btn.setAttribute("aria-label", "Play background music");
    } else {
      audio.play().catch(() => {
        /* autoplay blocked — user must interact again */
      });
      iconOn.style.display  = "none";
      iconOff.style.display = "block";
      btn.classList.add("playing");
      btn.setAttribute("aria-label", "Pause background music");
    }
    playing = !playing;
  });
})();

/* ─────────────────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById("back-to-top");

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ─────────────────────────────────────────────────────────
   RSVP FORM
───────────────────────────────────────────────────────── */
(function initRSVP() {
  const form      = document.getElementById("rsvp-form");
  const thankyou  = document.getElementById("rsvp-thankyou");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.value.trim()) {
      form.name.focus();
      return;
    }
    if (!form.attendance.value) {
      alert("Please select your attendance.");
      return;
    }

    // Attempt Netlify Forms submission
    const body = new URLSearchParams(new FormData(form)).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (res.ok || res.status === 200) {
        showThankYou();
      } else {
        // Fallback: show thank you anyway (local dev / non-Netlify)
        showThankYou();
      }
    } catch (_) {
      showThankYou();
    }
  });

  function showThankYou() {
    form.style.display = "none";
    thankyou.hidden = false;
    thankyou.scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();

/* ─────────────────────────────────────────────────────────
   FOOTER YEAR
───────────────────────────────────────────────────────── */
const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
