/* Demircan Kardeşler — site betiği (bağımlılıksız) */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Ayarları bağla (telefon, WhatsApp, e-posta, Instagram) ---- */
  if (C.phoneIntl) $$(".js-tel").forEach(function (a) { a.href = "tel:" + C.phoneIntl; });
  if (C.phoneDisplay) $$(".js-phone").forEach(function (el) { el.textContent = C.phoneDisplay; });
  if (C.whatsappNumber) {
    var wa = "https://wa.me/" + C.whatsappNumber + (C.whatsappMessage ? "?text=" + encodeURIComponent(C.whatsappMessage) : "");
    $$(".js-wa").forEach(function (a) { a.href = wa; });
  }
  if (C.email) $$(".js-email").forEach(function (a) { a.href = "mailto:" + C.email; a.textContent = C.email; });
  if (C.instagram) $$(".js-ig").forEach(function (a) { a.href = C.instagram; });
  if (C.instagramHandle) $$(".js-ig-handle").forEach(function (a) { a.textContent = C.instagramHandle; });
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Üst menü ---- */
  var hdr = $(".hdr"), burger = $("#burger"), nav = $("#nav");
  function onScroll() {
    hdr.classList.toggle("is-solid", window.scrollY > 20);
    if (window.scrollY < 300) $$("#nav a").forEach(function (a) { a.classList.remove("is-active"); });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function closeNav() { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Menüyü aç"); }
  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    hdr.classList.add("is-solid");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });

  /* Aktif bölüm vurgusu */
  if ("IntersectionObserver" in window) {
    var links = {};
    $$("a", nav).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          $$("a", nav).forEach(function (a) { a.classList.remove("is-active"); });
          links[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { so.observe(s); });
  }

  /* ---- Galeri ---- */
  var CATS = window.GALLERY_CATEGORIES || {};
  var ITEMS = window.GALLERY || [];
  var gal = $("#gallery"), filters = $("#filters");

  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function igCard() {
    var href = C.instagram || "https://www.instagram.com/demircankardeslerferforje/";
    var handle = C.instagramHandle || "@demircankardeslerferforje";
    return '<a class="gal__item gal__item--ig js-ig" href="' + esc(href) + '" target="_blank" rel="noopener">' +
      '<span class="gal__ig-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg><i></i></span>' +
      '<b>Daha fazlası Instagram\'da</b>' +
      '<small>' + esc(handle) + '</small></a>';
  }

  function render(cat) {
    if (!gal) return;
    var list = ITEMS.filter(function (it) { return it.src && (cat === "all" || it.category === cat); });
    var html = list.map(function (it, i) {
      var label = CATS[it.category] || "";
      return '<figure class="gal__item" style="animation-delay:' + (i * 40) + 'ms">' +
        '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy" decoding="async">' +
        '<button type="button" data-src="' + esc(it.src) + '" data-cap="' + esc(it.title) + '" aria-label="' + esc(it.title) + ' — büyüt"></button>' +
        '<figcaption class="gal__cap"><b>' + esc(it.title) + '</b><small>' + esc(label) + '</small></figcaption></figure>';
    }).join("");
    gal.innerHTML = html + igCard();
    $$("img", gal).forEach(function (img) {
      img.addEventListener("error", function () {
        var fig = img.closest(".gal__item");
        if (fig) fig.remove();
      });
    });
  }
  if (filters) {
    var used = {}; ITEMS.forEach(function (it) { if (it.src) used[it.category] = 1; });
    var keys = ["all"].concat(Object.keys(CATS).filter(function (k) { return used[k]; }));
    filters.innerHTML = keys.map(function (k, i) {
      return '<button type="button" data-cat="' + k + '" aria-pressed="' + (i === 0) + '">' + (k === "all" ? "Tümü" : esc(CATS[k])) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render(b.getAttribute("data-cat"));
    });
  }
  render("all");

  /* Lightbox */
  var lb = $("#lightbox");
  var lbIndex = 0;
  var lbList = [];

  function photoButtons() {
    return $$(".gal__item:not(.gal__item--ig) button[data-src]", gal);
  }
  function showLb(i) {
    if (!lbList.length) return;
    lbIndex = (i + lbList.length) % lbList.length;
    var it = lbList[lbIndex];
    var img = $("#lbImg");
    img.src = it.src;
    img.alt = it.alt || it.cap;
    $("#lbCap").textContent = it.cap;
    var cnt = $("#lbCount");
    if (cnt) cnt.textContent = (lbIndex + 1) + " / " + lbList.length;
    var prev = $("#lbPrev"), next = $("#lbNext");
    var many = lbList.length > 1;
    if (prev) prev.hidden = !many;
    if (next) next.hidden = !many;
    if (lb.showModal && !lb.open) lb.showModal();
  }
  function openLbAt(btn) {
    var buttons = photoButtons();
    lbList = buttons.map(function (b) {
      return { src: b.getAttribute("data-src"), cap: b.getAttribute("data-cap"), alt: b.getAttribute("aria-label") };
    });
    showLb(Math.max(0, buttons.indexOf(btn)));
  }
  if (lb && gal) {
    gal.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-src]"); if (!b) return;
      openLbAt(b);
    });
    $("#lbClose").addEventListener("click", function () { lb.close(); });
    var prev = $("#lbPrev"), next = $("#lbNext");
    if (prev) prev.addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex - 1); });
    if (next) next.addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
    if (!lb || !lb.open) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); showLb(lbIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showLb(lbIndex + 1); }
  });


  /* ---- Koyu / açık tema ---- */
  var root = document.documentElement, tg = $("#themeToggle");
  var mqLight = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  function setTheme(t, save) {
    root.setAttribute("data-theme", t);
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", t === "light" ? "#f3f1ec" : "#121417");
    if (tg) { tg.setAttribute("aria-pressed", String(t === "light")); tg.title = t === "light" ? "Koyu temaya geç" : "Açık temaya geç"; }
    if (save) { try { localStorage.setItem("dk-theme", t); } catch (e) {} }
  }
  setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark", false);
  if (tg) tg.addEventListener("click", function () {
    root.classList.add("theme-anim");
    setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    setTimeout(function () { root.classList.remove("theme-anim"); }, 450);
  });
  if (mqLight) {
    var onSys = function (e) {
      var saved; try { saved = localStorage.getItem("dk-theme"); } catch (x) {}
      if (saved !== "light" && saved !== "dark") setTheme(e.matches ? "light" : "dark", false);
    };
    if (mqLight.addEventListener) mqLight.addEventListener("change", onSys); else if (mqLight.addListener) mqLight.addListener(onSys);
  }

  /* ---- Kaydırdıkça kurulan çelik yapı (arka plan) ---- */
  (function () {
    var svg = $(".bp__svg"); if (!svg) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els = $$("[data-s]", svg).map(function (el) {
      return { el: el, s: +el.getAttribute("data-s"), e: +el.getAttribute("data-e"), line: el.classList.contains("bp-l"), last: -1 };
    });
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function paint(p) {
      for (var i = 0; i < els.length; i++) {
        var o = els[i], t = (p - o.s) / (o.e - o.s);
        t = t <= 0 ? 0 : t >= 1 ? 1 : ease(t);
        t = Math.round(t * 1000) / 1000;
        if (t === o.last) continue;
        o.last = t;
        if (o.line) o.el.style.strokeDashoffset = String(1 - t);
        else { o.el.style.opacity = String(t); o.el.style.transform = t === 1 ? "" : "translate3d(0," + ((1 - t) * -14).toFixed(1) + "px,0)"; }
      }
    }
    if (reduce) { svg.classList.add("bp--static"); return; }
    svg.classList.add("bp--live");
    var target = 0, cur = 0, raf = 0;
    function progress() {
      var max = (document.scrollingElement || root).scrollHeight - window.innerHeight;
      // yapı, sayfanın hero sonrasından başlayıp sayfa sonuna yaklaşırken tamamlanır
      var p = max > 0 ? window.scrollY / max : 1;
      return Math.min(1, Math.max(0, (p - 0.04) / 0.8));
    }
    function tick() {
      cur += (target - cur) * 0.18;
      if (Math.abs(target - cur) < 0.0008) cur = target;
      paint(cur);
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    }
    function onS() { target = progress(); if (!raf) raf = requestAnimationFrame(tick); }
    cur = target = progress(); paint(cur);
    window.addEventListener("scroll", onS, { passive: true });
    window.addEventListener("resize", onS, { passive: true });
  })();

  /* ---- Görünür olunca beliren öğeler ---- */
  var rv = $$(".card, .why__list li, .step, .proj__photo, .proj__draw, .proj__info, .contact__list li, .sec__head");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rv.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          var sib = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
          e.target.style.transitionDelay = Math.min(sib, 6) * 60 + "ms";
          e.target.classList.add("in"); io.unobserve(e.target);
          setTimeout(function (t) { t.style.transitionDelay = ""; }, 1300, e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  }
})();
