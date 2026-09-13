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
  var calcBox = document.querySelector(".calc");
  function inView(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    if (!mobilebar) return;
    // De balk is overbodig zodra je bij de calculator of het formulier bent
    mobilebar.classList.toggle("is-visible", y > 600 && !inView(booking) && !inView(calcBox));
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

    var leadParams = { value: +fN.value * PRICE_PP, currency: "EUR", occasion: fOcc.value, service: fType.value, form: "formulier" };
    sendLead(new FormData(form), leadParams, form.querySelector("button[type='submit']"), showDone, function (msg) { setStatus(msg, true); });
  });

  // Verstuurt een aanvraag (gedeeld door het formulier en de calculator).
  // Zolang er geen Web3Forms-key is, opent de mail-app met de ingevulde gegevens.
  function sendLead(data, leadParams, btn, onDone, onFail) {
    var key = data.get("access_key") || "";
    if (key.indexOf("JOUW") === 0) {
      var lines = [];
      data.forEach(function (v, k) { if (["access_key", "subject", "botcheck"].indexOf(k) === -1 && v) lines.push(k + ": " + v); });
      track("lead_mailto", leadParams);
      window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("Aanvraag cocktailworkshop") + "&body=" + encodeURIComponent(lines.join("\n"));
      return;
    }
    var label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Versturen…";
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message);
        track("generate_lead", leadParams);
        onDone();
      })
      .catch(function () {
        btn.disabled = false;
        btn.innerHTML = label;
        onFail('Er ging iets mis bij het versturen. Probeer het opnieuw of <a href="' + waUrl + '" target="_blank" rel="noopener">app Jan direct</a>.');
      });
  }

  // ===== Aanvraagknoppen ('Check beschikbaarheid', 'Aanvragen'): naar de calculator, daar begint de aanvraag =====
  function goToCalc() {
    calcBox.scrollIntoView({ behavior: "smooth", block: "start" });
    calcBox.classList.remove("is-highlight");
    void calcBox.offsetWidth; // animatie opnieuw starten
    calcBox.classList.add("is-highlight");
    track("cta_to_calc");
  }
  if (calcBox) {
    document.addEventListener("click", function (e) {
      if (!e.target.closest('a[href="#aanvragen"]')) return;
      e.preventDefault();
      setMenu(false);
      goToCalc();
    });
    // Binnenkomen via een link naar ...#aanvragen (bijv. vanaf een recept)
    if (location.hash === "#aanvragen") setTimeout(goToCalc, 60);
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
    updateFinish();
  }
  range.addEventListener("input", function () { setPersons(+range.value, "range"); });
  num.addEventListener("input", function () { if (num.value !== "") setPersons(+num.value, "num"); });
  num.addEventListener("blur", function () { setPersons(+num.value || persons); });
  document.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () { setPersons(persons + +b.getAttribute("data-step") * (+range.step || 1)); });
  });
  // Beginwaarde uit het typvak (dat kan een getal boven het schuifmaximum bevatten)
  setPersons(+num.value || +range.value);

  // Aanraken (telefoon/tablet): eigen sleep-afhandeling. Het native schuifje breekt op mobiel af
  // zodra de vinger iets verticaal beweegt (de pagina gaat dan scrollen) en reageert op iOS alleen
  // op het bolletje zelf. Nu zet tikken of slepen op de hele balk de waarde direct onder je vinger.
  // De muis houdt het native gedrag.
  var THUMB = 28;
  function valueFromX(x) {
    var rect = range.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (x - rect.left - THUMB / 2) / (rect.width - THUMB)));
    var min = +range.min, max = +range.max, step = +range.step || 1;
    return Math.min(max, Math.round((min + pct * (max - min)) / step) * step);
  }
  range.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    e.preventDefault();
    try { range.setPointerCapture(e.pointerId); } catch (err) { /* niet ondersteund: events komen toch binnen */ }
    setPersons(valueFromX(e.clientX), "touch");
    function move(ev) { setPersons(valueFromX(ev.clientX), "touch"); }
    function end() {
      range.removeEventListener("pointermove", move);
      range.removeEventListener("pointerup", end);
      range.removeEventListener("pointercancel", end);
    }
    range.addEventListener("pointermove", move);
    range.addEventListener("pointerup", end);
    range.addEventListener("pointercancel", end);
  });
  // Voorkomt dat het native schuifje (iOS) tegelijk met onze afhandeling gaat slepen
  range.addEventListener("touchstart", function (e) { e.preventDefault(); }, { passive: false });

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
    updateFinish();
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

  // Herstelt de browser velden (herladen, terugknop, bfcache)? Dan alles opnieuw gelijkzetten,
  // anders staat het schuifje op de herstelde waarde terwijl prijs en balk nog de oude tonen.
  window.addEventListener("pageshow", function () {
    setPersons(+num.value || +range.value);
    updateCta();
  });

  // ===== Aanvraag afronden in de calculator (geen pop-up) =====
  // Na 'Vraag … aan' klapt onder de calculator een kort blok open: je keuzes als labels (live bijgewerkt)
  // en alleen de 3 velden die nog ontbreken.
  var isBar = calcBox.getAttribute("data-mode") === "bar";
  var service = calcBox.getAttribute("data-type") || "Cocktailworkshop";
  var finish = document.getElementById("calc-finish");
  var chips = document.getElementById("finish-chips");
  var finishBtn = document.getElementById("finish-submit");
  var finishStatus = document.getElementById("finish-status");
  var finishWa = document.getElementById("finish-wa");
  var qContact = document.getElementById("q-contact");
  var finishStarted = false;

  function checkedOcc() { return document.querySelector("input[name='calc-occ']:checked"); }
  function personsLabel() { return persons + (isBar ? " gasten" : " personen"); }
  function dateLabel() {
    var part = currentPart().toLowerCase();
    if (selected) return dayFmt.format(fromIso(selected)) + (part ? ", " + part : "");
    return part ? part + ", datum nog open" : "datum nog open";
  }
  function waText() {
    var occ = checkedOcc();
    var t = "Hoi Jan! Wij zijn met " + personsLabel() + (occ ? " (" + occ.value.toLowerCase() + ")" : "");
    if (selected) t += " en zoeken " + dayFmt.format(fromIso(selected)) + (currentPart() ? " (" + currentPart().toLowerCase() + ")" : "");
    t += " een " + service.toLowerCase() + ". " + (selected ? "Is die datum nog vrij?" : "Kun je een voorstel sturen?");
    return t;
  }

  function updateFinish() {
    if (!finish || finish.hidden || !chips) return;
    var occ = checkedOcc();
    chips.innerHTML = [occ ? occ.nextElementSibling.textContent : "", personsLabel(), dateLabel()]
      .filter(Boolean).map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") +
      '<button type="button" class="chip chip--edit" data-edit>Wijzig</button>';
    finishBtn.innerHTML = (selected ? "Check of " + dayFmt.format(fromIso(selected)) + " vrij is" : "Vraag een voorstel aan") + ' <span aria-hidden="true">→</span>';
    finishWa.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(waText());
  }

  document.querySelectorAll("input[name='calc-occ']").forEach(function (r) { r.addEventListener("change", updateFinish); });

  calCta.addEventListener("click", function () {
    // Keuzes ook in het uitgebreide formulier onderaan zetten, voor wie daar verder gaat
    var occ = checkedOcc();
    if (occ) fOcc.value = occ.value;
    fN.value = persons;
    if (selected) fDate.value = selected;
    if (currentPart()) fPart.value = currentPart();
    fType.value = service;

    finish.hidden = false;
    calCta.hidden = true;
    calCta.setAttribute("aria-expanded", "true");
    updateFinish();
    finish.scrollIntoView({ behavior: "smooth", block: "start" });
    // Op touch niet automatisch focussen: het toetsenbord zou de labels met je keuzes wegdrukken
    if (!window.matchMedia("(pointer: coarse)").matches) {
      setTimeout(function () { document.getElementById("q-place").focus({ preventScroll: true }); }, 450);
    }
    track("calc_request", { persons: persons, date: selected || "", daypart: currentPart() });
  });

  chips.addEventListener("click", function (e) {
    if (e.target.closest("[data-edit]")) calcBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function contactValid() {
    var v = qContact.value.trim();
    var ok = v.indexOf("@") > -1 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.replace(/\D/g, "").length >= 10;
    qContact.setCustomValidity(ok ? "" : "Vul een geldig e-mailadres of telefoonnummer in");
    return ok;
  }

  function setFinishStatus(msg, isError) {
    finishStatus.innerHTML = msg || "";
    finishStatus.className = "form__status" + (isError ? " is-error" : "");
  }

  finish.addEventListener("input", function (e) {
    if (!finishStarted) { finishStarted = true; track("form_start", { form: "calculator" }); }
    if (e.target === qContact) contactValid();
    var field = e.target.closest(".field");
    if (field && e.target.checkValidity()) field.classList.remove("is-invalid");
  });

  function showFinishDone() {
    var recap = [personsLabel(), dateLabel(), document.getElementById("q-place").value].filter(Boolean).join(" · ");
    finish.innerHTML =
      '<div class="finish__done"><p class="calc__legend">Aanvraag verstuurd</p>' +
      "<h4>Proost, <em>bedankt!</em></h4>" +
      '<p class="finish__recap">' + recap + "</p>" +
      '<ol class="finish__next"><li>Jan checkt of ' + (selected ? dayFmt.format(fromIso(selected)) : "je datum") + " vrij is.</li>" +
      "<li>Je krijgt een voorstel met een vaste prijs.</li><li>Pas als jij akkoord bent, staat het vast.</li></ol>" +
      '<a class="finish__wa" href="' + finishWa.href + '" target="_blank" rel="noopener">Nog een vraag? App Jan</a></div>';
  }

  finish.addEventListener("submit", function (e) {
    e.preventDefault();
    setFinishStatus("");
    contactValid();
    var firstBad = null;
    finish.querySelectorAll("[required]").forEach(function (el) {
      var ok = el.checkValidity();
      el.closest(".field").classList.toggle("is-invalid", !ok);
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      firstBad.focus();
      setFinishStatus(firstBad === qContact && qContact.value ? "Vul een geldig e-mailadres of telefoonnummer in." : "Vul de gemarkeerde velden nog even in.", true);
      return;
    }

    var data = new FormData(finish);
    var contact = qContact.value.trim();
    var occ = checkedOcc();
    data.append("Gelegenheid", occ ? occ.value : "");
    data.append("Type", service);
    data.append(isBar ? "Aantal gasten" : "Aantal personen", persons);
    data.append("Datum", selected ? fullFmt.format(fromIso(selected)) : "nog open");
    data.append("Dagdeel", currentPart() || "nog open");
    if (contact.indexOf("@") > -1) data.append("email", contact); else data.append("Telefoon", contact);
    data.append("Bron", "Calculator " + location.pathname);

    var leadParams = { value: isBar ? 0 : persons * PRICE_PP, currency: "EUR", occasion: occ ? occ.value : "", service: service, form: "calculator" };
    sendLead(data, leadParams, finishBtn, showFinishDone, function (msg) { setFinishStatus(msg, true); });
  });
})();
