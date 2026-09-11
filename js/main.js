/* Shake by Jan – interactie */
(function () {
  "use strict";

  // ===== Instellingen (vervang de placeholders) =====
  var WHATSAPP_NUMBER = "31600000000"; // internationaal formaat, zonder + of spaties
  var WHATSAPP_TEXT = "Hoi Jan! Ik wil graag meer weten over een cocktailworkshop.";
  var PRICE_PP = 30;
  var FALLBACK_EMAIL = "info@shakebyjan.nl";

  document.documentElement.classList.remove("no-js");

  // Metingen lopen via js/consent.js (Consent Mode); zonder dat script gebeurt er niets
  function track(name, params) {
    if (typeof window.sbjTrack === "function") window.sbjTrack(name, params);
  }

  // ===== Datumhulpjes =====
  var today = new Date();
  var dayFmt = new Intl.DateTimeFormat("nl-NL", { weekday: "short", day: "numeric", month: "short" });
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function fromIso(s) { var p = s.split("-"); return new Date(+p[0], p[1] - 1, +p[2]); }
  var todayIso = iso(today);

  var year = document.getElementById("year");
  if (year) year.textContent = today.getFullYear();

  // ===== WhatsApp- en maillinks =====
  var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_TEXT);
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.href = waUrl;
    a.addEventListener("click", function () { track("click_whatsapp", { link_location: a.className.split(" ")[0] || "link" }); });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener("click", function () { track("click_email"); });
  });

  // ===== Header-achtergrond + mobiele CTA-balk =====
  var header = document.querySelector(".header");
  var mobilebar = document.getElementById("mobilebar");
  var booking = document.getElementById("aanvragen");
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    if (!mobilebar) return;
    var r = booking ? booking.getBoundingClientRect() : null;
    var bookingVisible = r ? r.top < window.innerHeight && r.bottom > 0 : false;
    mobilebar.classList.toggle("is-visible", y > 600 && !bookingVisible);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Menu: mobiele overlay + dropdown 'Activiteiten' =====
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var group = nav.querySelector(".nav__group");
  var drop = nav.querySelector(".nav__drop");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
  }
  function setDrop(open) {
    group.classList.toggle("is-open", open);
    drop.setAttribute("aria-expanded", String(open));
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  drop.addEventListener("click", function (e) { e.stopPropagation(); setDrop(!group.classList.contains("is-open")); });
  document.addEventListener("click", function (e) { if (!group.contains(e.target)) setDrop(false); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); setDrop(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); setDrop(false); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });

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

  // ===== Aanvraagformulier in stappen =====
  var form = document.getElementById("form");
  if (!form) return; // pagina's zonder formulier (recepten) zijn hier klaar

  var fOcc = document.getElementById("f-occ");
  var fType = document.getElementById("f-type");
  var fDate = document.getElementById("f-date");
  var fPart = document.getElementById("f-part");
  var fN = document.getElementById("f-n");
  var fPlace = document.getElementById("f-place");
  var status = document.getElementById("form-status");
  var summary = document.getElementById("form-summary");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".form__step"));
  var progress = form.querySelectorAll(".form__progress li");
  var current = 0;
  var started = false;

  fDate.min = todayIso;

  function setStatus(msg, isError) {
    status.innerHTML = msg || "";
    status.className = "form__status" + (isError ? " is-error" : "");
  }

  function stepValid(i, focus) {
    var ok = true;
    steps[i].querySelectorAll("[required]").forEach(function (el) {
      var valid = el.checkValidity();
      el.closest(".field").classList.toggle("is-invalid", !valid);
      if (!valid && ok) {
        ok = false;
        if (focus) el.focus();
      }
    });
    return ok;
  }

  function updateSummary() {
    var parts = [
      fOcc.value,
      fType.value,
      fDate.value ? dayFmt.format(fromIso(fDate.value)) : "",
      fPart.value && fPart.value !== "Weet ik nog niet" ? fPart.value.toLowerCase() : "",
      fN.value ? fN.value + " personen" : "",
      fPlace.value,
    ].filter(Boolean);
    summary.textContent = parts.join(" · ");
  }

  function goToStep(i, focus) {
    current = i;
    steps.forEach(function (s, n) { s.classList.toggle("is-active", n === i); });
    progress.forEach(function (li, n) {
      li.classList.toggle("is-active", n === i);
      li.classList.toggle("is-done", n < i);
    });
    if (i === steps.length - 1) updateSummary();
    if (focus) {
      var first = steps[i].querySelector("select, input:not([type=hidden]):not(.hp), textarea");
      if (first) first.focus({ preventScroll: true });
    }
    track("form_step", { step: i + 1 });
  }

  function next() {
    setStatus("");
    if (stepValid(current, true)) goToStep(current + 1, true);
    else setStatus("Vul de gemarkeerde velden nog even in.", true);
  }

  form.addEventListener("click", function (e) {
    if (e.target.closest("[data-next]")) next();
    else if (e.target.closest("[data-back]")) { setStatus(""); goToStep(current - 1, true); }
  });

  // Enter in een tussenstap gaat naar de volgende stap in plaats van te versturen
  form.addEventListener("keydown", function (e) {
    var tag = e.target.tagName;
    if (e.key === "Enter" && tag !== "TEXTAREA" && tag !== "BUTTON" && current < steps.length - 1) {
      e.preventDefault();
      next();
    }
  });

  form.addEventListener("input", function (e) {
    if (!started) { started = true; track("form_start"); }
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
    setStatus("");
    for (var i = 0; i < steps.length; i++) {
      if (!stepValid(i, false)) {
        goToStep(i, false);
        stepValid(i, true);
        setStatus("Vul de gemarkeerde velden nog even in.", true);
        return;
      }
    }

    var data = new FormData(form);
    var key = data.get("access_key") || "";
    var leadParams = { value: +fN.value * PRICE_PP, currency: "EUR", occasion: fOcc.value, service: fType.value };

    if (key.indexOf("JOUW") === 0) {
      // Nog geen Web3Forms-key ingesteld: open de mail-app met de ingevulde gegevens
      var lines = [];
      data.forEach(function (v, k) { if (["access_key", "subject", "botcheck"].indexOf(k) === -1 && v) lines.push(k + ": " + v); });
      track("lead_mailto", leadParams);
      window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("Aanvraag cocktailworkshop") + "&body=" + encodeURIComponent(lines.join("\n"));
      return;
    }

    var btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Versturen…";
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message);
        track("generate_lead", leadParams);
        showDone();
      })
      .catch(function () {
        btn.disabled = false;
        btn.innerHTML = 'Verstuur aanvraag <span aria-hidden="true">→</span>';
        setStatus('Er ging iets mis bij het versturen. Probeer het opnieuw of <a href="' + waUrl + '" target="_blank" rel="noopener">app Jan direct</a>.', true);
      });
  });

  // ===== Aanvraagvenster: elke knop naar #aanvragen opent direct het formulier =====
  var sheet = document.getElementById("sheet");
  var sheetBody = document.getElementById("sheet-body");
  var formHome = form.parentNode;
  var formNext = form.nextSibling;
  var lastFocus = null;

  function openSheet() {
    lastFocus = document.activeElement;
    form.classList.add("is-in");
    sheetBody.appendChild(form);
    goToStep(0, false);
    sheet.hidden = false;
    document.body.classList.add("sheet-open");
    requestAnimationFrame(function () { sheet.classList.add("is-open"); });
    sheetBody.scrollTop = 0;
    track("form_open");
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.classList.remove("is-open");
    document.body.classList.remove("sheet-open");
    setTimeout(function () {
      sheet.hidden = true;
      formHome.insertBefore(form, formNext);
    }, 250);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  if (sheet) {
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href="#aanvragen"]');
      if (link) {
        e.preventDefault();
        setMenu(false);
        openSheet();
      } else if (e.target.closest("[data-close]")) {
        closeSheet();
      }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
    // Binnenkomen via een link naar ...#aanvragen (bijv. vanaf een recept): venster direct openen
    if (location.hash === "#aanvragen") openSheet();
  }

  // ===== Prijscalculator =====
  var range = document.getElementById("calc-n");
  if (!range) return;

  // Aantal personen: schuifregelaar, typvak en −/+ knoppen blijven met elkaar in sync
  var num = document.getElementById("calc-num");
  var total = document.getElementById("calc-total");
  var fmt = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var persons = +range.value;
  function setPersons(n, from) {
    n = Math.max(1, Math.min(500, Math.round(n) || 1));
    persons = n;
    if (from !== "range") range.value = Math.min(Math.max(n, +range.min), +range.max);
    if (from !== "num") num.value = n;
    if (total) total.textContent = fmt.format(n * PRICE_PP);
    var pct = ((+range.value - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--fill", pct + "%");
  }
  range.addEventListener("input", function () { setPersons(+range.value, "range"); });
  num.addEventListener("input", function () { if (num.value !== "") setPersons(+num.value, "num"); });
  num.addEventListener("blur", function () { setPersons(+num.value || persons); });
  document.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () { setPersons(persons + +b.getAttribute("data-step") * (+range.step || 1)); });
  });
  setPersons(persons);

  // ===== Agenda + dagdeel =====
  var calGrid = document.getElementById("cal-grid");
  var calMonth = document.getElementById("cal-month");
  var calPrev = document.querySelector(".cal__nav[data-dir='-1']");
  var calNext = document.querySelector(".cal__nav[data-dir='1']");
  var calCta = document.getElementById("calc-cta");
  var MAX_MONTHS_AHEAD = 18;
  var startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var view = startMonth;
  var selected = null; // "JJJJ-MM-DD"
  var monthFmt = new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" });
  var fullFmt = new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  function monthsFromStart(d) { return (d.getFullYear() - startMonth.getFullYear()) * 12 + d.getMonth() - startMonth.getMonth(); }

  function renderCal() {
    calMonth.textContent = monthFmt.format(view);
    calPrev.disabled = monthsFromStart(view) <= 0;
    calNext.disabled = monthsFromStart(view) >= MAX_MONTHS_AHEAD;
    var html = "";
    var lead = (view.getDay() + 6) % 7; // maandag als eerste dag
    for (var i = 0; i < lead; i++) html += "<span></span>";
    var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (var d = 1; d <= days; d++) {
      var date = new Date(view.getFullYear(), view.getMonth(), d);
      var key = iso(date);
      var cls = "cal__day" + (key === todayIso ? " is-today" : "") + (date.getDay() % 6 === 0 ? " is-weekend" : "");
      html += '<button type="button" class="' + cls + '" data-date="' + key + '"' + (key < todayIso ? " disabled" : "") +
        ' aria-pressed="' + (key === selected) + '" aria-label="' + fullFmt.format(date) + '">' + d + "</button>";
    }
    calGrid.innerHTML = html;
  }

  function currentPart() {
    var p = document.querySelector("input[name='calc-part']:checked");
    return p ? p.value : "";
  }

  function updateCta() {
    var part = currentPart();
    var label = selected
      ? "Vraag " + dayFmt.format(fromIso(selected)) + (part ? " · " + part.toLowerCase() : "") + " aan"
      : "Vraag een voorstel aan";
    calCta.innerHTML = label + ' <span aria-hidden="true">→</span>';
  }

  calGrid.addEventListener("click", function (e) {
    var btn = e.target.closest(".cal__day");
    if (!btn || btn.disabled) return;
    selected = btn.getAttribute("data-date");
    renderCal();
    updateCta();
  });
  [calPrev, calNext].forEach(function (b) {
    b.addEventListener("click", function () {
      view = new Date(view.getFullYear(), view.getMonth() + +b.getAttribute("data-dir"), 1);
      renderCal();
    });
  });
  document.querySelectorAll("input[name='calc-part']").forEach(function (r) { r.addEventListener("change", updateCta); });
  renderCal();
  updateCta();

  // Keuzes uit de calculator meenemen naar het formulier; is stap 1 dan compleet, direct door naar stap 2
  calCta.addEventListener("click", function () {
    var occ = document.querySelector("input[name='calc-occ']:checked");
    if (occ) fOcc.value = occ.value;
    fN.value = persons;
    if (selected) fDate.value = selected;
    if (currentPart()) fPart.value = currentPart();
    var calcEl = document.querySelector(".calc");
    if (calcEl && calcEl.getAttribute("data-type")) fType.value = calcEl.getAttribute("data-type");
    form.querySelectorAll(".field.is-invalid").forEach(function (f) {
      var el = f.querySelector("input, select");
      if (el && el.checkValidity()) f.classList.remove("is-invalid");
    });
    track("calc_request", { persons: persons, date: selected || "", daypart: currentPart() });
    // Het aanvraagvenster gaat daarna open via de algemene #aanvragen-klik (zie hierboven)
  });
})();
