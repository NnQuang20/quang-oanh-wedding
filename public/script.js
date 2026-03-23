/* ══════════════════════════════════════════════════════════
   WEDDING INVITATION — PREMIUM EDITION
   Enhanced functionality with lightbox, form validation,
   and optimized performance
══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   CONFIGURATION
───────────────────────────────────────────────────────── */
const WEDDING_DATE = new Date("2026-04-05T10:00:00");
const WEDDING_LOCATION = "Thôn 3 Hạ Lôi, Mê Linh, Hà Nội, Việt Nam";

/* ─────────────────────────────────────────────────────────
   LOADING & PERFORMANCE OPTIMIZATION
───────────────────────────────────────────────────────── */
(function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  // Preload critical images
  const criticalImages = [
    "assets/cover.jpg",
    "assets/couple.jpg",
  ];

  let loadedCount = 0;
  const totalImages = criticalImages.length;

  criticalImages.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
    };
    img.onerror = () => {
      loadedCount++;
    };
    img.src = src;
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      loadingScreen.addEventListener(
        "transitionend",
        () => loadingScreen.remove(),
        { once: true }
      );
    }, 800);
  });
})();

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
      const offset = (progress - 0.5) * 80;
      bg.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ─────────────────────────────────────────────────────────
   SCROLL FADE (IntersectionObserver) — Premium Timing
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
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────────
   GALLERY LIGHTBOX
───────────────────────────────────────────────────────── */
(function initGalleryLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const image = document.getElementById("lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const currentSpan = document.getElementById("lightbox-current");
  const totalSpan = document.getElementById("lightbox-total");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentIndex = 0;
  const totalItems = galleryItems.length;

  if (totalSpan) totalSpan.textContent = totalItems;

  function open(index) {
    currentIndex = index;
    const img = galleryItems[index].querySelector("img");
    
    // Fade out current image
    image.classList.add("fade-out");
    
    // Wait for fade out, then update image and fade in
    setTimeout(() => {
      image.src = img.src;
      image.alt = img.alt;
      image.classList.remove("fade-out");
      image.classList.add("fade-in");
      setTimeout(() => image.classList.remove("fade-in"), 400);
    }, 200);
    
    currentSpan.textContent = index + 1;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function next() {
    open((currentIndex + 1) % totalItems);
  }

  function prev() {
    open((currentIndex - 1 + totalItems) % totalItems);
  }

  // Gallery item click
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  // Modal controls
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("active")) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
  });

  // Swipe support
  let touchStartX = 0;
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
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

  function animateNumberChange(el, newValue) {
    if (el.textContent !== newValue) {
      el.classList.add("float-down");
      setTimeout(() => {
        el.textContent = newValue;
        el.classList.remove("float-down");
      }, 250);
    }
  }

  function tick() {
    const diff = WEDDING_DATE - Date.now();

    if (diff <= 0) {
      animateNumberChange(daysEl, "00");
      animateNumberChange(hoursEl, "00");
      animateNumberChange(minsEl, "00");
      animateNumberChange(secsEl, "00");
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    animateNumberChange(daysEl, pad(days));
    animateNumberChange(hoursEl, pad(hours));
    animateNumberChange(minsEl, pad(mins));
    animateNumberChange(secsEl, pad(secs));
  }

  tick();
  setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────────────────────
   MUSIC TOGGLE — Smart Autoplay with Browser Policy Handling
───────────────────────────────────────────────────────── */
(function initMusic() {
  const btn = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-music");
  const iconOn = document.getElementById("music-icon-on");
  const iconOff = document.getElementById("music-icon-off");
  let playing = false;
  let autoplayAttempted = false;

  // Function to toggle music
  function toggleMusic() {
    if (playing) {
      audio.pause();
      iconOn.style.display = "block";
      iconOff.style.display = "none";
      btn.classList.remove("playing");
      btn.setAttribute("aria-label", "Play background music");
    } else {
      audio.play().catch(() => {
        /* autoplay blocked — browser policy prevents it */
      });
      iconOn.style.display = "none";
      iconOff.style.display = "block";
      btn.classList.add("playing");
      btn.setAttribute("aria-label", "Pause background music");
    }
    playing = !playing;
  }

  // Handle button click
  btn.addEventListener("click", toggleMusic);

  // Attempt autoplay on first user interaction (respects browser policies)
  function attemptAutoplay() {
    if (!autoplayAttempted) {
      autoplayAttempted = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded
            playing = true;
            iconOn.style.display = "none";
            iconOff.style.display = "block";
            btn.classList.add("playing");
            document.removeEventListener("click", attemptAutoplay);
            document.removeEventListener("scroll", attemptAutoplay);
          })
          .catch(() => {
            /* Autoplay blocked by browser — user must click button */
            autoplayAttempted = false;
          });
      }
    }
  }

  // Try to autoplay on first user interaction
  document.addEventListener("click", attemptAutoplay, { once: true });
  document.addEventListener("scroll", attemptAutoplay, { once: true, passive: true });
})();

/* ─────────────────────────────────────────────────────────
   BACK TO TOP & STICKY CTA
───────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  const stickyCta = document.getElementById("sticky-cta");

  window.addEventListener(
    "scroll",
    () => {
      const isVisible = window.scrollY > 400;
      btn.classList.toggle("visible", isVisible);
      stickyCta.classList.toggle("visible", isVisible);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ─────────────────────────────────────────────────────────
   ADD TO CALENDAR
───────────────────────────────────────────────────────── */
(function initAddToCalendar() {
  const btn = document.getElementById("add-to-cal");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const event = {
      title: "Nhân Quang & Kim Oanh's Wedding",
      description: "Join us for our wedding celebration",
      location: WEDDING_LOCATION,
      startDate: "20260405T100000",
      endDate: "20260405T230000",
    };

    // Google Calendar URL
    const googleCalendarUrl = [
      "https://calendar.google.com/calendar/render?action=TEMPLATE",
      `&text=${encodeURIComponent(event.title)}`,
      `&dates=20260405T100000/20260405T230000`,
      `&details=${encodeURIComponent(event.description)}`,
      `&location=${encodeURIComponent(event.location)}`,
      "&ctz=UTC",
    ].join("");

    window.open(googleCalendarUrl, "_blank");
  });
})();

/* ─────────────────────────────────────────────────────────
   RSVP FORM VALIDATION & SUBMISSION
───────────────────────────────────────────────────────── */
(function initRSVP() {
  const form = document.getElementById("rsvp-form");
  const thankyou = document.getElementById("rsvp-thankyou");

  if (!form) return;

  // Real-time field validation
  const nameInput = document.getElementById("rsvp-name");
  const emailInput = document.getElementById("rsvp-email");

  function validateField(field) {
    const group = field.closest(".form-group");
    const errorEl = group.querySelector(".form-error");
    let isValid = true;
    let message = "";

    if (field.id === "rsvp-name") {
      isValid = field.value.trim().length >= 2;
      message = "Name must be at least 2 characters";
    } else if (field.id === "rsvp-email" && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(field.value);
      message = "Please enter a valid email address";
    }

    if (!isValid) {
      group.classList.add("invalid");
      field.classList.add("error");
      if (errorEl) errorEl.textContent = message;
    } else {
      group.classList.remove("invalid");
      field.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    }

    return isValid;
  }

  nameInput.addEventListener("blur", () => validateField(nameInput));
  emailInput.addEventListener("blur", () => validateField(emailInput));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all required fields
    let isFormValid = true;

    if (!form.name.value.trim()) {
      const nameGroup = nameInput.closest(".form-group");
      nameGroup.classList.add("invalid");
      nameInput.classList.add("error");
      isFormValid = false;
    }

    if (!form.attendance.value) {
      alert("Please select your attendance.");
      isFormValid = false;
    }

    if (!isFormValid) return;

    // Submit form
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
(function initFooter() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

