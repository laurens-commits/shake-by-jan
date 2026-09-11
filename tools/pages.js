// Inhoud van de landingspagina's per activiteit.
// Elke pagina heeft eigen tekst voor de doelgroep (geen duplicate content).
// Na een wijziging: node tools/build.js

module.exports = [
  {
    slug: "cocktailworkshop",
    navLabel: "Cocktailworkshop",
    navSub: "Zelf leren shaken",
    mode: "workshop",
    occasion: "Vriendengroep",
    type: "Cocktailworkshop",
    title: "Cocktailworkshop op locatie in Alkmaar, Heerhugowaard e.o. | Shake by Jan",
    description: "Cocktailworkshop op je eigen locatie: jullie shaken zelf, Jan Berkhout begeleidt. Binnen 30 km van Heerhugowaard, vanaf €30 p.p. all-in inclusief drank en materiaal.",
    hero: {
      eyebrow: "Cocktailworkshop op locatie",
      h1: "Leer shaken als <em>een echte bartender</em>",
      lead: "Een cocktailworkshop waarin jullie zelf achter de bar staan. Jan Berkhout neemt de complete bar mee naar jouw locatie en leert je stap voor stap cocktails maken die net zo goed smaken als in een cocktailbar.",
      secondary: "Bekijk prijs &amp; datum",
    },
    intro: {
      eyebrow: "Zelf doen",
      h2: "Geen demonstratie, <em>zelf shaken</em>",
      paragraphs: [
        "Bij veel workshops sta je vooral te kijken. Bij Shake by Jan krijgt iedereen zelf de shaker in handen. Jan doet het een keer voor, legt uit waarom het zo moet en daarna ga je zelf aan de slag. Zo leer je de technieken die bartenders elke dag gebruiken.",
        "Je proeft het verschil tussen een geshakete en een geroerde cocktail, ontdekt waarom de juiste hoeveelheid ijs zo belangrijk is en leert hoe je een drankje afmaakt met een simpele garnering. Na afloop weet je genoeg om thuis indruk te maken.",
      ],
      benefitsTitle: "Wat je leert",
      benefits: [
        ["Shaken en stirren", "De twee basistechnieken van elke bar, en wanneer je welke gebruikt."],
        ["De juiste balans", "Hoe je zoet, zuur en sterk in evenwicht brengt, zodat je ook zonder recept een goede cocktail maakt."],
        ["Garneren en serveren", "Een schilletje, een takje munt, het juiste glas: de details die een cocktail afmaken."],
        ["Klassiekers en hun verhaal", "Jan vertelt waar bekende cocktails vandaan komen. Leuk om te weten, en handig voor je volgende feestje."],
      ],
    },
    program: {
      h2: "Zo verloopt <em>de workshop</em>",
      steps: [
        ["Jan bouwt de bar op", "Hij zet op jouw locatie de complete bar klaar: flessen, verse ingrediënten, ijs en materiaal."],
        ["Uitleg en demonstratie", "Jan laat zien hoe het moet en deelt de tips die hij in 10 jaar achter de bar heeft opgedaan."],
        ["Zelf aan de slag", "Iedereen maakt zijn eigen cocktails. Jan loopt rond, helpt waar nodig en proeft mee."],
        ["Proosten en opruimen", "Jullie genieten van het resultaat. Jan ruimt na afloop alles weer op."],
      ],
    },
    extra: {
      eyebrow: "Voor wie",
      h2: "Geschikt voor <em>beginners</em>",
      html: `<p>Deze workshop is voor iedereen die van een goed drankje houdt en het zelf wil leren maken. Ervaring heb je niet nodig: Jan begint bij de basis en past het tempo aan op de groep.</p>
          <p>Organiseer je de workshop voor een bepaalde gelegenheid? Lees dan ook over de workshop als <a href="../vrijgezellenfeest/">vrijgezellenfeest</a>, als <a href="../vriendenuitje/">vriendenuitje</a> of als <a href="../bedrijfsuitje/">bedrijfsuitje</a>.</p>`,
    },
    host: "Jan werkt al 10 jaar in de horeca en won in 2019 de verkiezing De leukste bartender van Alkmaar. Hij weet hoe je techniek uitlegt zonder dat het een schoolles wordt, en hoe je een groep enthousiast houdt.",
    faqTitle: "Vragen over de <em>cocktailworkshop</em>",
    faq: [
      ["Heb ik ervaring nodig?", "Nee. De workshop is juist bedoeld voor mensen die nog nooit een cocktail hebben gemaakt. Jan begint bij de basis."],
      ["Hoeveel cocktails maak je tijdens de workshop?", "Iedereen maakt meerdere cocktails. Hoeveel precies en welke, stemt Jan af in het voorstel voor jullie groep."],
      ["Kan de workshop bij mij thuis?", "Ja, als er ruimte is voor je groep en een tafel voor de bar. Een zaal, kantoor of vakantiehuis binnen 30 km van Heerhugowaard kan ook."],
      ["Wat kost een cocktailworkshop?", "Vanaf €30 per persoon, all-in: drank, ingrediënten, materiaal, op- en afbouw en reiskosten binnen 30 km. Je krijgt vooraf een voorstel met de exacte prijs."],
    ],
    cta: {
      h2: "Zelf leren shaken? <em>Plan je workshop</em>",
      lead: "Kies je datum en dagdeel, dan stuurt Jan je een voorstel op maat.",
    },
  },

  {
    slug: "cocktailfeest",
    navLabel: "Cocktailfeest",
    navSub: "Een barman op je feest",
    mode: "bar",
    occasion: "Verjaardag of jubileum",
    type: "Cocktailbar op locatie",
    title: "Cocktailfeest met eigen barman in Alkmaar, Heerhugowaard e.o. | Shake by Jan",
    description: "Een cocktailbar op je feest, met Jan Berkhout achter de bar. Voor verjaardagen, jubilea en bruiloften binnen 30 km van Heerhugowaard. Vraag een prijs op maat aan.",
    hero: {
      eyebrow: "Cocktailbar op locatie",
      h1: "Jouw feest, <em>met een eigen cocktailbar</em>",
      lead: "Geen kratje bier en een fles wijn, maar een complete cocktailbar met een barman die weet wat hij doet. Jij geniet van je gasten, Jan Berkhout shaket de hele avond.",
      secondary: "Kies je datum",
    },
    intro: {
      eyebrow: "Ontspannen gastheer",
      h2: "Jij bent de gastheer, <em>niet de barman</em>",
      paragraphs: [
        "Wie een feest geeft, staat vaak zelf de hele avond drankjes in te schenken. Met een cocktailbar op locatie is dat voorbij. Jan zet een complete bar neer, stelt een cocktailkaart samen die bij jouw feest past en serveert je gasten zolang de bar open is.",
        "Een cocktailbar geeft een feest meteen een andere sfeer. Gasten komen naar de bar voor een praatje, kijken hoe hun drankje wordt gemaakt en proberen iets wat ze nog nooit hebben gedronken.",
      ],
      benefitsTitle: "Waarom een cocktailbar op je feest",
      benefits: [
        ["Een kaart op maat", "Samen met Jan kies je de cocktails, afgestemd op je gasten en het thema van je feest."],
        ["Een barman met ervaring", "10 jaar horeca betekent ook: rustig blijven als er ineens een rij aan de bar staat."],
        ["Ook alcoholvrij", "Voor gasten die niet drinken maakt Jan mocktails die net zo verzorgd zijn."],
        ["Niets zelf regelen", "Drank, ijs, glazen, opbouw en opruimen: het zit er allemaal bij."],
      ],
    },
    program: {
      h2: "Zo verloopt <em>je cocktailfeest</em>",
      steps: [
        ["Kaart samenstellen", "Vooraf bespreken jullie welke cocktails er op de kaart komen en hoe lang de bar open is."],
        ["Opbouwen", "Voordat je gasten binnenkomen, staat de bar klaar."],
        ["Shaken voor je gasten", "Jan maakt cocktails op bestelling, zodat iedereen krijgt waar hij zin in heeft."],
        ["Afbouwen", "Na afloop neemt Jan alles weer mee. Jij hoeft niets op te ruimen."],
      ],
    },
    extra: {
      eyebrow: "Gelegenheden",
      h2: "Voor welke <em>feesten?</em>",
      html: `<ul class="ticks">
            <li>Verjaardagen en jubilea</li>
            <li>Bruiloften en recepties</li>
            <li>Tuinfeesten en housewarmings</li>
            <li>Personeelsfeesten en relatie-events</li>
          </ul>
          <p>Wil je dat je gasten liever zelf shaken? Kijk dan bij de <a href="../cocktailworkshop/">cocktailworkshop</a>. Beide combineren kan ook: eerst een korte workshop, daarna gaat de bar open.</p>`,
    },
    host: "Jan staat al 10 jaar achter de bar en won in 2019 De leukste bartender van Alkmaar. Hij maakt niet alleen goede cocktails, hij zorgt ook voor sfeer aan de bar.",
    faqTitle: "Vragen over een <em>cocktailfeest</em>",
    faq: [
      ["Wat kost een cocktailbar op mijn feest?", "Dat hangt af van het aantal gasten, hoe lang de bar open is en de cocktailkaart. Je krijgt vooraf een voorstel met een vaste prijs, zodat je niet voor verrassingen komt te staan."],
      ["Voor hoeveel gasten kan Jan cocktails maken?", "Vertel in je aanvraag hoeveel gasten je verwacht. Jan laat je in het voorstel weten wat er mogelijk is."],
      ["Welke cocktails kunnen er op de kaart?", "Klassiekers als een Espresso Martini of Mojito, maar ook iets speciaals dat bij jouw feest past. Je bepaalt het samen met Jan."],
      ["Wat heb ik nodig op de locatie?", "Alleen een plek waar de bar kan staan. Wat er verder handig is, bespreek je vooraf met Jan."],
    ],
    cta: {
      h2: "Een cocktailbar op je feest? <em>Vraag een prijs aan</em>",
      lead: "Geef je datum, dagdeel en het aantal gasten door, dan maakt Jan een voorstel met een vaste prijs.",
    },
  },

  {
    slug: "vrijgezellenfeest",
    navLabel: "Vrijgezellenfeest",
    navSub: "Voor de bruid of bruidegom",
    mode: "workshop",
    occasion: "Vrijgezellenfeest",
    type: "Cocktailworkshop",
    title: "Vrijgezellenfeest met cocktailworkshop in Alkmaar & Heerhugowaard | Shake by Jan",
    description: "Een cocktailworkshop als vrijgezellenfeest: samen shaken, een wedstrijdje en de bruid of bruidegom in het middelpunt. Op locatie binnen 30 km van Heerhugowaard, vanaf €30 p.p.",
    hero: {
      eyebrow: "Vrijgezellenfeest",
      h1: "Een vrijgezellenfeest <em>om op te proosten</em>",
      lead: "Je wilt dat de bruid of bruidegom een dag heeft om nooit te vergeten, en je wilt niet wekenlang bezig zijn met regelen. Een cocktailworkshop met Jan is het allebei: iets wat iedereen leuk vindt, in één keer geregeld.",
      secondary: "Bekijk prijs &amp; datum",
    },
    intro: {
      eyebrow: "Het ijs breken",
      h2: "Waarom een cocktailworkshop <em>zo goed werkt</em>",
      paragraphs: [
        "Bij een vrijgezellenfeest is de groep vaak gemengd: vrienden van school, collega's, familie. Niet iedereen kent elkaar. Samen cocktails maken breekt het ijs vanzelf, en al snel staat iedereen te lachen om elkaars shaketechniek.",
        "Jan maakt er een programma van dat bij jullie groep past. Een wedstrijdje wie de mooiste cocktail maakt, een speciale cocktail voor de hoofdpersoon of een opdracht die alleen de bruid of bruidegom mag uitvoeren: je zegt het maar.",
      ],
      benefitsTitle: "Zo maak je het extra speciaal",
      benefits: [
        ["De hoofdpersoon in de spotlight", "Een eigen cocktail op naam, of een opdracht waar de rest van de groep over beslist."],
        ["Een wedstrijdje", "Wie maakt de lekkerste of mooiste cocktail? Jan is de strenge maar eerlijke jury."],
        ["Makkelijk te combineren", "Plan de workshop als afsluiter van een actieve dag, of als start van de avond voordat jullie op stap gaan."],
        ["Alles geregeld", "Eén aanvraag, één prijs per persoon. Geen boodschappen doen en geen bar huren."],
      ],
    },
    program: {
      h2: "Een voorbeeld <em>van jullie dag</em>",
      steps: [
        ["Overdag: jullie activiteit", "Een actieve activiteit, een lunch of gewoon samen bijkletsen."],
        ["Jan bouwt de bar op", "Op de plek van jullie keuze: een vakantiehuis, een tuin of iemands woonkamer."],
        ["De cocktailworkshop", "Samen shaken, proeven en strijden om de titel beste bartender van de groep."],
        ["Door naar de avond", "Uit eten, stappen of gewoon doorgaan. Jan ruimt op, jullie hoeven nergens meer aan te denken."],
      ],
      note: "Dit is een voorbeeld. Jan stemt het programma af op jullie planning.",
    },
    extra: {
      eyebrow: "Tips",
      h2: "Tips voor <em>de organisator</em>",
      html: `<ul class="ticks">
            <li>Vraag op tijd aan: vrijgezellenfeesten vallen vaak op een zaterdag, en die data zijn het eerst vol.</li>
            <li>Laat weten of er gasten zijn die geen alcohol drinken. Jan zorgt dan voor alcoholvrije versies.</li>
            <li>Is de workshop een verrassing voor de hoofdpersoon? Zet het in je aanvraag, dan houdt Jan daar rekening mee.</li>
            <li>Een vaste prijs per persoon maakt het makkelijk om de kosten met de groep te verdelen.</li>
          </ul>`,
    },
    host: "Jan heeft 10 jaar horeca-ervaring en won in 2019 De leukste bartender van Alkmaar. Precies de host die je wilt op een vrijgezellenfeest: vakkundig, maar vooral gezellig.",
    faqTitle: "Vragen over een <em>vrijgezellenfeest</em>",
    faq: [
      ["Kan de workshop in ons vakantiehuis?", "Ja, als het binnen 30 km van Heerhugowaard ligt, bijvoorbeeld een vakantiehuis in Bergen of Egmond. Ligt het net daarbuiten? Vraag het gerust."],
      ["Kunnen we de workshop combineren met een andere activiteit?", "Zeker. Plan de workshop na een activiteit overdag of vlak voor het diner, en kies in de agenda het dagdeel dat bij jullie planning past."],
      ["Kan de bruid of bruidegom een speciale rol krijgen?", "Ja. Laat in je aanvraag weten wat je in gedachten hebt. Jan denkt graag mee over een verrassing of een eigen cocktail."],
      ["Wat kost een cocktailworkshop voor een vrijgezellenfeest?", "Vanaf €30 per persoon, all-in. Zo weet je vooraf precies wat iedereen betaalt."],
    ],
    cta: {
      h2: "Regel het vrijgezellenfeest <em>in één keer</em>",
      lead: "Kies de datum en het dagdeel, en vertel Jan wat jullie in gedachten hebben voor de hoofdpersoon.",
    },
  },

  {
    slug: "vriendenuitje",
    navLabel: "Vriendenuitje",
    navSub: "Samen iets nieuws doen",
    mode: "workshop",
    occasion: "Vriendengroep",
    type: "Cocktailworkshop",
    title: "Vriendenuitje: cocktailworkshop met vrienden in Alkmaar & Heerhugowaard | Shake by Jan",
    description: "Op zoek naar een leuke activiteit met vrienden? Een cocktailworkshop bij jou thuis of op een andere locatie binnen 30 km van Heerhugowaard. Vanaf €30 p.p. all-in.",
    hero: {
      eyebrow: "Activiteit met vrienden",
      h1: "Eindelijk weer eens <em>iets anders met vrienden</em>",
      lead: "Uit eten, de kroeg, een escaperoom: allemaal al gedaan. Tijd voor iets nieuws. Met een cocktailworkshop haal je de bar gewoon naar de woonkamer en worden jullie zelf de bartenders.",
      secondary: "Bekijk prijs &amp; datum",
    },
    intro: {
      eyebrow: "Samen, thuis",
      h2: "De avond begint <em>aan de keukentafel</em>",
      paragraphs: [
        "Het leukste aan een avond met vrienden is de tijd samen. Een cocktailworkshop geeft die avond iets extra's zonder dat het geforceerd voelt. Jullie kletsen, lachen, maken en proeven, en Jan zorgt dat alles klopt.",
        "Omdat Jan naar jullie toe komt, hoeft niemand te reserveren of na afloop nog ergens vandaan te komen. Je zit gewoon thuis, met een glas in je hand en een paar nieuwe recepten op zak.",
      ],
      benefitsTitle: "Perfect voor",
      benefits: [
        ["Een verjaardag", "Geen kringverjaardag, maar een avond waarop iedereen meedoet."],
        ["Een reünie", "Oude vrienden, nieuwe herinneringen. Samen iets doen praat makkelijker dan alleen bijpraten."],
        ["Een mijlpaal", "Tien jaar vriendschap, een nieuw huis of gewoon een goede reden om te proosten."],
        ["Zomaar", "Omdat het tijd werd dat jullie weer eens iets samen deden."],
      ],
    },
    program: {
      h2: "Zo ziet <em>jullie avond eruit</em>",
      steps: [
        ["Jan komt langs", "Jan bouwt de bar op, zodat alles klaarstaat als de eerste vrienden binnenkomen."],
        ["Leren shaken", "Jan legt de basis uit en laat zien hoe het moet."],
        ["Om de beurt achter de bar", "Iedereen maakt zijn eigen favorieten, en die van de rest."],
        ["Blijven hangen", "De workshop is klaar, de avond nog lang niet. Jan ruimt op, jullie gaan gewoon door."],
      ],
    },
    extra: {
      eyebrow: "Locatie",
      h2: "Thuis of <em>op een andere plek</em>",
      html: `<p>De workshop kan gewoon thuis, bij een van jullie in de woonkamer, keuken of tuin. Het kan ook in een vakantiehuis, een clubhuis of een zaaltje. Zolang het binnen 30 km van Heerhugowaard is, komt Jan ernaartoe.</p>
          <p>Is een van jullie jarig of gaat er iemand trouwen? Bekijk dan ook het <a href="../vrijgezellenfeest/">vrijgezellenfeest</a> of een <a href="../cocktailfeest/">cocktailbar op je feest</a>.</p>`,
    },
    host: "Jan werkt al 10 jaar in de horeca en won in 2019 De leukste bartender van Alkmaar. Hij voelt goed aan hoe hij een vriendengroep meekrijgt.",
    faqTitle: "Vragen over een <em>vriendenuitje</em>",
    faq: [
      ["Met hoeveel vrienden kan de workshop?", "Geef in je aanvraag door met hoeveel jullie zijn. Jan laat in het voorstel weten wat er mogelijk is en wat het kost."],
      ["Kan de workshop 's avonds?", "Ja, kies gewoon het dagdeel avond in de agenda. Ochtend of middag kan ook, bijvoorbeeld op een zondag."],
      ["Wat als niet iedereen alcohol drinkt?", "Geen probleem. Jan maakt dan dezelfde cocktails in een alcoholvrije versie, zodat iedereen gewoon meedoet."],
      ["Moeten we zelf iets regelen?", "Alleen de plek en de vrienden. Drank, ingrediënten, glazen en materiaal neemt Jan mee, en na afloop ruimt hij alles op."],
    ],
    cta: {
      h2: "Plan jullie <em>vriendenavond</em>",
      lead: "Prik een datum in de agenda, kies het dagdeel en Jan regelt de rest.",
    },
  },

  {
    slug: "bedrijfsuitje",
    navLabel: "Bedrijfsuitje",
    navSub: "Team, borrel of personeelsfeest",
    mode: "workshop",
    occasion: "Bedrijfsfeest",
    type: "Cocktailworkshop",
    title: "Bedrijfsuitje of teamuitje met cocktailworkshop in Alkmaar & Heerhugowaard | Shake by Jan",
    description: "Cocktailworkshop als bedrijfsuitje, teamuitje of personeelsfeest. Op kantoor of op locatie binnen 30 km van Heerhugowaard, met Jan Berkhout als host. Vanaf €30 p.p. all-in.",
    hero: {
      eyebrow: "Bedrijfsuitje",
      h1: "Een teamuitje waar <em>collega's over napraten</em>",
      lead: "Het jaarlijkse uitje, een personeelsfeest of een borrel met relaties: met een cocktailworkshop of een cocktailbar geef je het een persoonlijke touch. Jan komt naar jullie kantoor of een locatie naar keuze.",
      secondary: "Bekijk prijs &amp; datum",
    },
    intro: {
      eyebrow: "Teambuilding",
      h2: "Samen shaken is <em>ook samenwerken</em>",
      paragraphs: [
        "Een goed teamuitje brengt collega's dichter bij elkaar, zonder dat het voelt als een verplichte teambuildingsoefening. Bij een cocktailworkshop gaat dat vanzelf. Collega's helpen elkaar, dagen elkaar uit en leren elkaar op een andere manier kennen.",
        "Geen workshop, maar wel iets bijzonders voor een borrel of feest? Dan staat Jan de hele avond achter een cocktailbar voor jullie gasten.",
      ],
      benefitsTitle: "Wat je als organisator aan Jan hebt",
      benefits: [
        ["Op kantoor of op locatie", "Jan komt naar jullie toe. Geen reistijd en geen gedoe met vervoer voor het hele team."],
        ["Eén aanspreekpunt", "Je regelt alles direct met Jan, van het voorstel tot de dag zelf."],
        ["Heldere prijs vooraf", "Een all-in prijs per persoon, zodat je budget klopt en er achteraf niets bij komt."],
        ["Iedereen doet mee", "Ook collega's die geen alcohol drinken, met alcoholvrije versies van elke cocktail."],
      ],
    },
    program: {
      h2: "Voorbeeld van <em>een teamuitje</em>",
      steps: [
        ["Afstemmen", "Je bespreekt met Jan de groepsgrootte, de locatie en of het een workshop of een cocktailbar wordt."],
        ["Opbouw op locatie", "Jan zet de bar klaar voordat je collega's binnenkomen, bijvoorbeeld na de laatste vergadering van de dag."],
        ["Workshop in teams", "Collega's werken in kleine teams en strijden om de beste cocktail."],
        ["Borrel en afsluiting", "Het team proost op het resultaat, Jan ruimt alles weer op."],
      ],
      note: "Dit is een voorbeeld. Jan stemt het programma af op jullie team.",
    },
    extra: {
      eyebrow: "Gelegenheden",
      h2: "Voor elk <em>zakelijk moment</em>",
      html: `<ul class="ticks">
            <li>Teamuitje of afdelingsuitje</li>
            <li>Vrijdagmiddagborrel</li>
            <li>Personeelsfeest of kerstborrel</li>
            <li>Relatie-event of opening</li>
            <li>Afscheid of jubileum van een collega</li>
          </ul>
          <p>Liever een bar waar Jan voor jullie gasten shaket? Lees meer over de <a href="../cocktailfeest/">cocktailbar op locatie</a>.</p>`,
    },
    host: "Na 10 jaar in de horeca, en de titel De leukste bartender van Alkmaar in 2019, weet Jan hoe je een zakelijk gezelschap losmaakt. Van een klein team tot een grotere groep: hij betrekt iedereen erbij.",
    faqTitle: "Vragen over een <em>bedrijfsuitje</em>",
    faq: [
      ["Kan de workshop op ons kantoor?", "Ja, als er ruimte is voor de groep en een tafel voor de bar. Een vergaderzaal, kantine of bedrijfsrestaurant kan prima."],
      ["Is er een alcoholvrije optie voor collega's?", "Ja. Elke cocktail kan in een alcoholvrije versie, zodat niemand buiten de boot valt. Handig voor collega's die nog naar huis moeten rijden."],
      ["Workshop of cocktailbar: wat past bij ons?", "Wil je dat collega's actief samen iets doen, kies dan een workshop. Is het vooral een feest of borrel waar mensen willen kletsen, dan past een cocktailbar beter. Twijfel je? Kies 'Weet ik nog niet' in het formulier, dan denkt Jan met je mee."],
      ["Kan het ook in december?", "Ja, maar decemberdata voor kerstborrels zijn populair. Vraag daarom op tijd aan."],
    ],
    cta: {
      h2: "Plan jullie <em>teamuitje</em>",
      lead: "Kies de datum en het dagdeel, en geef door met hoeveel collega's jullie zijn.",
    },
  },
];
