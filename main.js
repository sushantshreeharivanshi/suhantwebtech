(function () {
  "use strict";

  var WA =
    "https://wa.me/917607425821?text=" +
    encodeURIComponent("Hi SSH team — I want a website for my business.");

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cursor glow — desktop */
  var cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches && !prefersReduced) {
    cursorGlow.classList.add("is-on");
    var cx = 0;
    var cy = 0;
    var tx = 0;
    var ty = 0;
    window.addEventListener(
      "mousemove",
      function (e) {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );
    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      cursorGlow.style.left = cx + "px";
      cursorGlow.style.top = cy + "px";
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* Header */
  var header = document.querySelector(".header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* Mobile nav */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menu close" : "Menu open");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menu open");
        document.body.style.overflow = "";
      });
    });
  }

  function showAllReveals() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* GSAP animations — ScrollTrigger is optional; without it we fall back to CSS + IO */
  function initAnimations() {
    if (typeof gsap === "undefined") {
      fallbackReveal();
      return;
    }

    try {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }

      if (prefersReduced) {
        showAllReveals();
        var ce = document.querySelector(".stat__num[data-count]");
        if (ce) ce.textContent = ce.getAttribute("data-count") || "50";
        return;
      }

      /* immediateRender: false = do not hide hero before first tween (avoids blank flash) */
      var heroTl = gsap.timeline({
        defaults: { ease: "power4.out", immediateRender: false },
      });
      heroTl
        .from(".hero__badges .pill", {
          y: 24,
          opacity: 0,
          filter: "blur(8px)",
          stagger: 0.1,
          duration: 0.55,
        })
        .from(
          ".hero__line",
          {
            y: 90,
            opacity: 0,
            rotateX: -12,
            filter: "blur(10px)",
            stagger: 0.14,
            duration: 0.85,
            transformOrigin: "50% 100%",
          },
          "-=0.25"
        )
        .from(
          "#hero-sub",
          { y: 28, opacity: 0, filter: "blur(6px)", duration: 0.65 },
          "-=0.45"
        )
        .from(
          ".hero__actions .btn",
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 },
          "-=0.35"
        )
        .from(
          ".hero__stats .stat",
          { y: 22, opacity: 0, stagger: 0.1, duration: 0.5 },
          "-=0.3"
        )
        .from(
          "#hero-visual",
          {
            x: 40,
            opacity: 0,
            scale: 0.94,
            filter: "blur(12px)",
            duration: 1,
          },
          "-=0.9"
        );

      var countEl = document.querySelector(".stat__num[data-count]");
      if (countEl) {
        var target = parseInt(countEl.getAttribute("data-count"), 10) || 50;
        var counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.85,
          ease: "power2.out",
          delay: 0.35,
          onUpdate: function () {
            countEl.textContent = String(Math.round(counter.n));
          },
        });
      }

      /* Scroll reveals: require ScrollTrigger; otherwise IntersectionObserver + is-visible */
      if (typeof ScrollTrigger !== "undefined") {
        gsap.utils.toArray("[data-reveal]").forEach(function (el) {
          gsap.from(el, {
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            y: 44,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.85,
            ease: "power3.out",
          });
        });
      } else {
        fallbackReveal();
      }
    } catch (err) {
      console.warn("SSH: animation fallback —", err);
      showAllReveals();
      fallbackReveal();
    }
  }

  function fallbackReveal() {
    if (prefersReduced) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var els = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }

  /* Contact form */
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var text =
        "Hi, I'm interested in a website.%0A%0A" +
        "Name: " +
        encodeURIComponent(name) +
        "%0APhone: " +
        encodeURIComponent(phone) +
        "%0A%0A" +
        encodeURIComponent(message);
      var wa = "https://wa.me/917607425821?text=" + text;
      statusEl.textContent = "Opening WhatsApp with your message…";
      window.open(wa, "_blank", "noopener,noreferrer");
      setTimeout(function () {
        statusEl.textContent = "If WhatsApp didn't open, message us at +91 76074 25821.";
      }, 800);
    });
  }

  /* Portfolio aria */
  document.querySelectorAll(".portfolio__item").forEach(function (item) {
    var title = item.getAttribute("data-title");
    if (title) item.setAttribute("aria-label", title);
  });

  /* ========== Chatbot ========== */
  var chatbot = document.getElementById("chatbot");
  var chatToggle = document.getElementById("chatbot-toggle");
  var chatPanel = document.getElementById("chatbot-panel");
  var chatClose = document.getElementById("chatbot-close");
  var chatMessages = document.getElementById("chatbot-messages");
  var chatChips = document.getElementById("chatbot-chips");
  var chatForm = document.getElementById("chatbot-form");
  var chatInput = document.getElementById("chatbot-input");

  var QUICK_CHIPS = [
    { label: "💰 Pricing & packages", value: "pricing" },
    { label: "⏱ Delivery time?", value: "time" },
    { label: "🛠 Services", value: "services" },
    { label: "💬 WhatsApp pe baat", value: "whatsapp" },
  ];

  function botReply(key) {
    var map = {
      pricing:
        "Basic website <strong>₹5,000</strong> (5 pages), Standard <strong>₹8,000</strong>, Premium <strong>₹12,000</strong>. Exact quote aapke requirements ke hisaab se — niche form ya WhatsApp par details bhejo.",
      time:
        "Usually <strong>2–3 days</strong> mein live kar dete hain (content ready hone par). Complex e‑commerce mein thoda zyada time lag sakta hai.",
      services:
        "Hum <strong>business sites, portfolio, landing pages, e‑commerce</strong> aur <strong>SEO‑ready</strong> websites banate hain — mobile responsive + fast loading.",
      whatsapp:
        'Bilkul! Neeche button se WhatsApp open karo, ya <a class="chatbot__link" href="' +
        WA +
        '" target="_blank" rel="noopener">yahan tap karo</a>.',
      hello: "Namaste! Main SSH Assistant hoon. Aapko website chahiye local business ke liye ya startup ke liye?",
      thanks: "Thank you! Agar aur sawaal hon to poochho — ya seedha WhatsApp par message kar do.",
      default:
        "Main abhi demo assistant hoon. Exact discussion ke liye <strong>WhatsApp</strong> par message kar do — team jaldi reply karegi. Phone: <strong>+91 76074 25821</strong>",
    };
    return map[key] || map.default;
  }

  function matchIntent(text) {
    var t = text.toLowerCase();
    if (/price|pricing|kitne|paisa|cost|package|₹|rupee/.test(t)) return "pricing";
    if (/time|din|day|kitna time|delivery|launch|kab/.test(t)) return "time";
    if (/service|kaam|kya ban|e-?commerce|shop|portfolio|landing/.test(t)) return "services";
    if (/whatsapp|wa\.me|msg|message|call/.test(t)) return "whatsapp";
    if (/hi|hello|hey|namaste|kaise|help/.test(t)) return "hello";
    if (/thank|dhanyavaad|shukriya/.test(t)) return "thanks";
    return "default";
  }

  function scrollChatToEnd() {
    if (!chatMessages) return;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addMessage(html, who) {
    if (!chatMessages) return;
    var div = document.createElement("div");
    div.className = "chatbot__msg chatbot__msg--" + (who || "bot");
    div.innerHTML = html;
    chatMessages.appendChild(div);
    scrollChatToEnd();
  }

  function showTyping(cb) {
    if (!chatMessages) return;
    var wrap = document.createElement("div");
    wrap.className = "chatbot__typing";
    wrap.innerHTML = "<span></span><span></span><span></span>";
    wrap.setAttribute("aria-hidden", "true");
    chatMessages.appendChild(wrap);
    scrollChatToEnd();
    setTimeout(function () {
      wrap.remove();
      if (cb) cb();
    }, 650 + Math.random() * 400);
  }

  function renderChips() {
    if (!chatChips) return;
    chatChips.innerHTML = "";
    QUICK_CHIPS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chatbot__chip";
      b.textContent = c.label;
      b.addEventListener("click", function () {
        addMessage(c.label, "user");
        showTyping(function () {
          addMessage(botReply(c.value));
        });
      });
      chatChips.appendChild(b);
    });
  }

  function openChat() {
    if (!chatPanel || !chatToggle) return;
    chatPanel.hidden = false;
    chatToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("chatbot-open");
    if (chatInput) setTimeout(function () {
      chatInput.focus();
    }, 200);
  }

  function closeChat() {
    if (!chatPanel || !chatToggle) return;
    chatPanel.hidden = true;
    chatToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("chatbot-open");
  }

  if (chatToggle && chatPanel && chatMessages) {
    chatToggle.addEventListener("click", function () {
      if (chatPanel.hidden) {
        openChat();
        if (chatMessages.children.length === 0) {
          addMessage(
            "Hey! 👋 Main <strong>SSH Assistant</strong> hoon. Website, pricing ya timeline — kuch bhi poochho, ya quick buttons use karo.",
            "bot"
          );
          renderChips();
        }
      } else {
        closeChat();
      }
    });
  }

  if (chatClose) {
    chatClose.addEventListener("click", closeChat);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeChat();
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text) return;
      addMessage(text.replace(/</g, "&lt;"), "user");
      chatInput.value = "";
      var intent = matchIntent(text);
      showTyping(function () {
        addMessage(botReply(intent));
      });
    });
  }

  /* Smooth scroll — offset for sticky header */
  var headerEl = document.querySelector(".header");
  var headerH = headerEl ? headerEl.offsetHeight : 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq__trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      if (!item) return;
      var panel = item.querySelector(".faq__panel");
      var bodyEl = panel ? panel.querySelector(".faq__body") : null;
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        if (other === item) return;
        other.classList.remove("is-open");
        var p = other.querySelector(".faq__panel");
        var b = other.querySelector(".faq__trigger");
        if (p) p.style.maxHeight = "0px";
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (isOpen) {
        item.classList.remove("is-open");
        if (panel) panel.style.maxHeight = "0px";
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        if (panel && bodyEl) {
          panel.style.maxHeight = bodyEl.scrollHeight + 32 + "px";
        }
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  window.addEventListener(
    "resize",
    function () {
      document.querySelectorAll(".faq__item.is-open").forEach(function (item) {
        var panel = item.querySelector(".faq__panel");
        var bodyEl = panel ? panel.querySelector(".faq__body") : null;
        if (panel && bodyEl) panel.style.maxHeight = bodyEl.scrollHeight + 32 + "px";
      });
    },
    { passive: true }
  );
})();
