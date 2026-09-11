/* Shake by Jan – interactie */
(function () {
  "use strict";

  // ===== Instellingen (vervang de placeholders) =====
  var WHATSAPP_NUMBER = "31600000000"; // internationaal formaat, zonder + of spaties
  var WHATSAPP_TEXT = "Hoi Jan! Ik wil graag meer weten over een cocktailworkshop.";
  var PRICE_PP = 30;
  var FALLBACK_EMAIL = "info@shakebyjan.nl";

  var doc = document.documentElement;
  doc.classList.remove("no-js");

  // ===== WhatsApp-links =====
  var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_TEXT);
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) { a.href = waUrl; });

  // ===== Header-achtergrond + mobiele CTA-balk =====
  var header = document.querySelector(".header");
  var mobilebar = document.getElementById("mobilebar");
  var booking = document.getElementById("aanvragen");
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    var bookingTop = booking.getBoundingClientRect().top;
    var bookingVisible = bookingTop < window.innerHeight && booking.getBoundingClientRect().bottom > 0;
    mobilebar.classList.toggle("is-visible", y > 600 && !bookingVisible);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Mobiel menu =====
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // ===== Reveal bij scrollen =====
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("reveal"); });
        el.style.transitionDelay = Math.min(siblings.indexOf(el), 5) * 80 + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ===== Formulier-velden =====
  var form = document.getElementById("form");
  var fOcc = document.getElementById("f-occ");
  var fN = document.getElementById("f-n");
  var fDate = document.getElementById("f-date");

  var today = new Date();
  fDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.getElementById("year").textContent = today.getFullYear();

  // Kaart-links vullen de gelegenheid alvast in
  document.querySelectorAll("[data-occasion]").forEach(function (a) {
    a.addEventListener("click", function () { fOcc.value = a.getAttribute("data-occasion"); });
  });

  // ===== Prijscalculator =====
  var range = document.getElementById("calc-n");
  var out = document.getElementById("calc-n-out");
  var total = document.getElementById("calc-total");
  var fmt = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  function updateCalc() {
    var n = +range.value;
    out.textContent = n;
    total.textContent = fmt.format(n * PRICE_PP);
    var pct = ((n - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--fill", pct + "%");
  }
  range.addEventListener("input", updateCalc);
  updateCalc();

  document.getElementById("calc-cta").addEventListener("click", function () {
    var occ = document.querySelector("input[name='calc-occ']:checked");
    if (occ) fOcc.value = occ.value;
    fN.value = range.value;
  });

  // ===== Verzenden (Web3Forms, met mailto-terugval zolang er geen key is) =====
  var status = document.getElementById("form-status");

  function validate() {
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (el) {
      var valid = el.checkValidity();
      el.closest(".field").classList.toggle("is-invalid", !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    return ok;
  }

  form.addEventListener("input", function (e) {
    var field = e.target.closest(".field");
    if (field && e.target.checkValidity()) field.classList.remove("is-invalid");
  });

  function showDone() {
    form.innerHTML =
      '<div class="form__done"><h3>Proost, <em>bedankt!</em></h3>' +
      "<p>Je aanvraag is binnen. Jan neemt zo snel mogelijk contact met je op met een voorstel op maat.</p>" +
      '<a class="btn btn--dark" href="' + waUrl + '" target="_blank" rel="noopener">Of app Jan direct</a></div>';
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.className = "form__status";
    if (!validate()) {
      status.textContent = "Vul de gemarkeerde velden nog even in.";
      status.classList.add("is-error");
      return;
    }

    var data = new FormData(form);
    var key = data.get("access_key") || "";

    if (key.indexOf("JOUW") === 0) {
      // Nog geen Web3Forms-key ingesteld: open de mail-app met de ingevulde gegevens
      var lines = [];
      data.forEach(function (v, k) { if (["access_key", "subject", "botcheck"].indexOf(k) === -1 && v) lines.push(k + ": " + v); });
      window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("Aanvraag cocktailworkshop") + "&body=" + encodeURIComponent(lines.join("\n"));
      return;
    }

    var btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Versturen…";
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.success) {
          showDone();
          if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { value: +fN.value * PRICE_PP, currency: "EUR" });
        } else { throw new Error(res.message); }
      })
      .catch(function () {
        btn.disabled = false;
        btn.innerHTML = 'Verstuur aanvraag <span aria-hidden="true">→</span>';
        status.innerHTML = 'Er ging iets mis bij het versturen. Probeer het opnieuw of <a href="' + waUrl + '" target="_blank" rel="noopener">app Jan direct</a>.';
        status.classList.add("is-error");
      });
  });
})();
