# Shake by Jan

Website voor cocktailworkshops en cocktailbar op locatie van Jan Berkhout (regio Heerhugowaard, 30 km).
Statische HTML/CSS/JS, geen build-stap.

- `index.html` – one-pager (hero, gelegenheden, aanbod, prijscalculator, over Jan, werkwijze, werkgebied, FAQ, aanvraagformulier)
- `privacy.html` – privacyverklaring
- `css/style.css`, `js/main.js`
- Landingspagina's per activiteit: `/cocktailworkshop/`, `/cocktailfeest/`, `/vrijgezellenfeest/`, `/vriendenuitje/`, `/bedrijfsuitje/`
- **Bouwen:** `node tools/build.js` genereert de landingspagina's uit `tools/pages.js` en zet de gedeelde onderdelen (header/menu, calculator met agenda, foto van Jan, formulier, footer) in `index.html` tussen de `<!-- build:... -->` markers. Pas tekst van landingspagina's aan in `tools/pages.js` en gedeelde onderdelen in `tools/build.js`, niet in de gegenereerde HTML. Draai daarna opnieuw.
- Stadspagina's (`tools/cities.js`): Alkmaar, Heerhugowaard, Hoorn, Schagen, Castricum, Purmerend → `/cocktailworkshop-<stad>/`
- Recepten (`tools/recipes.js`): overzicht op `/recepten/`, 6 recepten op `/recepten/<slug>/` met schema.org Recipe
- Aanvraagformulier in 3 stappen (wat & wanneer → groep & plek → gegevens); de calculator vult stap 1 en springt door naar stap 2
- Foto van Jan: zet hem als `assets/jan-berkhout.jpg` neer en draai de build; de placeholder wordt dan overal vervangen.

## Metingen (GA4 + Google Ads)

`js/consent.js` regelt cookietoestemming (Google Consent Mode v2, standaard alles geweigerd), laadt gtag.js en verstuurt events. Vul bovenin `GA4_ID`, `ADS_ID` en `ADS_LEAD_LABEL` in; zolang het placeholders zijn wordt er niets geladen en verschijnt er geen banner. Banner bekijken zonder ID's: voeg `?cookiebanner` aan de URL toe.

Events: `generate_lead` (aanvraag verstuurd, met waarde = personen × €30; triggert ook de Google Ads-conversie), `lead_mailto` (zolang Web3Forms nog niet is ingesteld), `form_start`, `form_step`, `calc_request`, `click_whatsapp`, `click_email`. Markeer in GA4 `generate_lead` als belangrijke gebeurtenis.
- Lokale preview: `node tools/serve.js 8767` → http://localhost:8767
- Live (GitHub Pages, deployt automatisch bij elke push naar `main`): https://laurens-commits.github.io/shake-by-jan/

## Nog in te vullen (placeholders)

| Wat | Waar |
|---|---|
| WhatsApp-nummer | `WHATSAPP_NUMBER` in `js/main.js` |
| Web3Forms access key (gratis, web3forms.com) | `access_key` in het formulier in `index.html` – zolang de placeholder staat, opent het formulier de mail-app |
| E-mailadres | `info@shakebyjan.nl` in `index.html`, `privacy.html`, `js/main.js` |
| Domein | `shakebyjan.nl` in canonical/og-tags, `robots.txt`, `sitemap.xml`, JSON-LD |
| KvK-nummer | footer `index.html` en `privacy.html` |
| Foto van Jan | vervang `.photo-ph` in de sectie "Over Jan" door `<img src="assets/jan-berkhout.jpg" alt="Jan Berkhout achter de bar">` |

## Te checken met Jan

- Wat valt precies onder "all-in" (nu: host, drank en ingrediënten, materiaal, ijs/garnering, op- en afbouw, reiskosten binnen 30 km)
- Minimum groepsgrootte en duur van een workshop (staan bewust nog niet op de site)
- Alcoholvrije varianten en de cocktails in de marquee (Espresso Martini, Mojito, Pornstar Martini, Whiskey Sour, Moscow Mule)
- Echte reviews toevoegen zodra die er zijn (geen verzonnen reviews plaatsen)
