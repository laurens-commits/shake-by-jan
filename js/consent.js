/* Shake by Jan – cookietoestemming, Google Consent Mode v2, GA4 en Google Ads.
   Laad dit script in de <head>, vóór andere scripts.
   Zolang de ID's hieronder placeholders zijn, wordt er niets geladen en verschijnt er geen banner. */
(function () {
  "use strict";

  // ===== Instellingen (vervang de placeholders) =====
  var GA4_ID = "G-XXXXXXXXXX";          // GA4 meet-ID
  var ADS_ID = "AW-XXXXXXXXXX";         // Google Ads conversie-ID
  var ADS_LEAD_LABEL = "XXXXXXXXXXXX";  // label van de conversieactie 'Aanvraag'
  var STORAGE_KEY = "sbj-consent";

  var configured = function (id) { return !!id && id.indexOf("XXXX") === -1; };
  var active = configured(GA4_ID) || configured(ADS_ID);
  var script = document.currentScript;
  var privacyUrl = (script && script.getAttribute("data-privacy")) || "privacy.html";

  // ===== Consent Mode: standaard alles geweigerd =====
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);

  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
  if (stored) update(stored, false);

  if (active) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + (configured(GA4_ID) ? GA4_ID : ADS_ID);
    document.head.appendChild(tag);
    gtag("js", new Date());
    if (configured(GA4_ID)) gtag("config", GA4_ID);
    if (configured(ADS_ID)) gtag("config", ADS_ID);
  }

  function update(choice, save) {
    gtag("consent", "update", {
      analytics_storage: choice.analytics ? "granted" : "denied",
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied",
    });
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: !!choice.analytics, marketing: !!choice.marketing, date: new Date().toISOString() })); } catch (e) { /* opslag geblokkeerd */ }
    }
  }

  // ===== Events voor de rest van de site (main.js roept dit aan) =====
  window.sbjTrack = function (name, params) {
    params = params || {};
    gtag("event", name, params);
    if (name === "generate_lead" && configured(ADS_ID) && configured(ADS_LEAD_LABEL)) {
      gtag("event", "conversion", { send_to: ADS_ID + "/" + ADS_LEAD_LABEL, value: params.value, currency: "EUR" });
    }
  };

  // ===== Banner =====
  var banner = null;

  function build() {
    banner = document.createElement("div");
    banner.className = "cookie";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "cookie-title");
    banner.innerHTML =
      '<h2 id="cookie-title">Mogen we cookies gebruiken?</h2>' +
      "<p>We willen graag meten hoe bezoekers de site gebruiken en welke advertenties werken. Dat doen we alleen als jij dat goed vindt. " +
      '<a href="' + privacyUrl + '#cookies">Meer info</a></p>' +
      '<div class="cookie__opts" hidden>' +
      '<label><input type="checkbox" checked disabled><span><strong>Noodzakelijk</strong><small>Onthoudt je cookiekeuze. Altijd aan.</small></span></label>' +
      '<label><input type="checkbox" name="analytics"><span><strong>Analytisch</strong><small>Bezoekstatistieken via Google Analytics.</small></span></label>' +
      '<label><input type="checkbox" name="marketing"><span><strong>Marketing</strong><small>Meten van advertenties via Google Ads.</small></span></label>' +
      "</div>" +
      '<div class="cookie__btns">' +
      '<button type="button" class="btn btn--ghost" data-c="deny">Alleen noodzakelijk</button>' +
      '<button type="button" class="btn btn--gold" data-c="all">Alles accepteren</button>' +
      "</div>" +
      '<button type="button" class="cookie__link" data-c="custom">Zelf kiezen</button>';
    document.body.appendChild(banner);

    var opts = banner.querySelector(".cookie__opts");
    var link = banner.querySelector(".cookie__link");
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-c]");
      if (!btn) return;
      var action = btn.getAttribute("data-c");
      if (action === "all") return decide({ analytics: true, marketing: true });
      if (action === "deny") return decide({ analytics: false, marketing: false });
      if (action === "custom") {
        opts.hidden = false;
        link.setAttribute("data-c", "save");
        link.textContent = "Keuze opslaan";
        return;
      }
      if (action === "save") {
        decide({ analytics: opts.querySelector("[name=analytics]").checked, marketing: opts.querySelector("[name=marketing]").checked });
      }
    });
  }

  function show() {
    if (!banner) build();
    var current = stored || {};
    banner.querySelector("[name=analytics]").checked = !!current.analytics;
    banner.querySelector("[name=marketing]").checked = !!current.marketing;
    banner.hidden = false;
  }

  function decide(choice) {
    stored = choice;
    update(choice, true);
    banner.hidden = true;
  }

  function init() {
    var preview = /[?&]cookiebanner\b/.test(location.search);
    if ((active && !stored) || preview) show();
    document.querySelectorAll("[data-cookie-settings]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); show(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
