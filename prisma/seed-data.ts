/** Initiale CMS-Daten (ehemals hardcoded) – nur für prisma/seed.ts */

export const SEED_SERVICE_ROWS: {
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  body: string[];
  categorySlug: string;
}[] = [
  {
    slug: "hochbau",
    title: "Hochbau",
    excerpt:
      "Neubau, Erweiterungen und tragende Strukturen – planvoll koordiniert und normgerecht umgesetzt.",
    intro:
      "Im Hochbau verbinden wir Statik, Bauablauf und Gewerke so, dass Ihr Gebäude sicher steht und termingerecht übergeben werden kann.",
    body: [
      "Wir begleiten Sie von der Rohbauphase bis zur Übergabereife – inklusive Schnittstellenmanagement zu Architektur und Fachplanung.",
      "Unsere Teams arbeiten mit klaren Qualitätszyklen, dokumentierten Abnahmen und transparentem Reporting für Bauherren und Projektsteuerung.",
    ],
    categorySlug: "struktur-rohbau",
  },
  {
    slug: "tiefbau",
    title: "Tiefbau",
    excerpt:
      "Erdarbeiten, Kanalbau und Fundamentvorbereitung mit maschineller Präzision und Baustellensicherheit.",
    intro:
      "Tiefbau bildet die Basis jedes Bauvorhabens. Wir setzen auf saubere Schnittführung, Entwässerungskonzepte und stabile Baugruben.",
    body: [
      "Ob Leitungsgräben, Baugruben oder Bodenplattenvorbereitung: Wir koordinieren Löffelarbeiten, Verbau und Entsorgung wirtschaftlich und sicher.",
      "Dokumentation von Schichten, Pegeln und Abnahmen ist für uns selbstverständlich – besonders bei innerstädtischen und sensiblen Flächen.",
    ],
    categorySlug: "struktur-rohbau",
  },
  {
    slug: "rohbau",
    title: "Rohbau",
    excerpt:
      "Mauerwerk und Stahlbeton für tragende Konstruktionen – exakte Achsen und saubere Übergaben an Folgewerke.",
    intro:
      "Der Rohbau definiert Geometrie und Statik. Wir arbeiten achs- und höhenexakt, damit Folgewerke ohne Nacharbeit starten können.",
    body: [
      "Schalung, Bewehrung und Betonage werden nach Plan abgestimmt; wir sichern Toleranzen und dokumentieren kritische Schnittstellen.",
      "Übergaben an Elektro, Sanitär und Ausbau erfolgen strukturiert, damit Schnittstellen im BIM- oder Planungsalltag klar bleiben.",
    ],
    categorySlug: "struktur-rohbau",
  },
  {
    slug: "innenausbau",
    title: "Innenausbau",
    excerpt:
      "Funktionale und repräsentative Innenräume – von Trockenbau bis Feinspachtel, alles aus einer Hand steuerbar.",
    intro:
      "Innenausbau macht aus Rohbau nutzbare Flächen. Wir denken Brandschutz, Akustik und Nutzerkomfort von Anfang an mit.",
    body: [
      "Wände, Decken und Einbauten werden nach Raumbuch und Detailplan umgesetzt; Abstimmung mit Möbelbau und Haustechnik ist Standard.",
      "Saubere Baustellenlogistik minimiert Reibungsverluste – besonders in bewohnten oder teilgenutzten Gebäuden.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "sanierung",
    title: "Sanierung",
    excerpt:
      "Bestandsgebäude wertstabil halten – Schadensanierung, energetische Verbesserung und technische Modernisierung.",
    intro:
      "Sanierung erfordert Diagnose, Schutzmaßnahmen und eine klare Priorisierung. Wir arbeiten störungsarm und dokumentiert.",
    body: [
      "Feuchte, Risse oder veraltete Haustechnik werden systematisch erfasst; Maßnahmen werden nach Dringlichkeit und Budget gestaffelt.",
      "Denkmalschutz oder Mieterbetreuung berücksichtigen wir in Ablauf und Kommunikation – für reibungslose Phasen im Bestand.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    excerpt:
      "GKP-Systeme, Brandschutz und Akustik – präzise Montage und saubere Kanten für hochwertige Oberflächen.",
    intro:
      "Trockenbau ermöglicht flexible Raumstrukturen. Wir setzen Systeme normgerecht um und achten auf saubere Schnittstellen zu Boden und Decke.",
    body: [
      "Metallständerwerke, Beplankungen und Akustikmaßnahmen werden nach Herstellervorgaben und Planung montiert und abgenommen.",
      "Besondere Anforderungen wie Reinräume oder erhöhte Feuchteklassen berücksichtigen wir bei Materialwahl und Details.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "fliesenarbeiten",
    title: "Fliesenarbeiten",
    excerpt:
      "Naturstein und Keramik – exakte Schnitte, ebene Flächen und langlebige Verfugung für Bad und Gewerbe.",
    intro:
      "Fliesenarbeiten entscheiden sich in Details: Untergrund, Verlegemuster und Silikonfugen müssen zur Nutzung passen.",
    body: [
      "Wir verlegen großformatige Platten eben und sicher, setzen Entkopplungssysteme ein und dokumentieren Abdichtungen im Nassbereich.",
      "Für Gewerbe und öffentliche Bereiche berücksichtigen wir Rutschhemmung, Reinigungsfreundlichkeit und robuste Kanten.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "malerarbeiten",
    title: "Malerarbeiten",
    excerpt:
      "Spachtel, Anstrich und Beschichtung – makellose Oberflächen und haltbare Systeme für Innen und Außen.",
    intro:
      "Malerarbeiten sind die sichtbare Qualitätsschicht. Wir bereiten Untergründe sorgfältig vor und wählen Systeme passend zur Nutzung.",
    body: [
      "Von Q3-Q4-Spachteltechnik bis zur kratzfesten Beschichtung in Treppenhäusern: Wir arbeiten staubarm und terminorientiert.",
      "Außenanstriche und Fassadenbeschichtungen stimmen wir mit Witterung und Untergrund ab – inklusive Haftprüfungen.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "bodenverlegung",
    title: "Bodenverlegung",
    excerpt:
      "Parkett, Vinyl und Designbeläge – ebene Untergründe, saubere Übergänge und gewährleistete Systeme.",
    intro:
      "Ein Boden muss optisch überzeugen und funktionieren. Wir achten auf Feuchte, Ebenheit und die richtige Akustiklösung.",
    body: [
      "Verlegearten und Klebstoffe wählen wir nach Nutzungsklasse; Heizestrich und Estrichtrocknung koordinieren wir mit den Gewerken.",
      "Sockelleisten, Übergangsprofile und Treppenkanten werden präzise gesetzt – für langlebige und pflegeleichte Ergebnisse.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "abbrucharbeiten",
    title: "Abbrucharbeiten",
    excerpt:
      "Selektiver Rückbau und Entkernung – Lärm- und Staubmanagement, Entsorgungsnachweise und Arbeitssicherheit.",
    intro:
      "Abbruch ist Präzisionsarbeit im Bestand. Wir schützen verbleibende Strukturen und trennen Materialströme fachgerecht.",
    body: [
      "Maschineller und manueller Rückbau wird mit Schutzmaßnahmen für Mieter, Gewerbe und öffentliche Wege geplant.",
      "Entsorgungsnachweise und ggf. Altlastenmanagement werden transparent bereitgestellt – für eine saubere Projektabwicklung.",
    ],
    categorySlug: "struktur-rohbau",
  },
  {
    slug: "elektroarbeiten",
    title: "Elektroarbeiten",
    excerpt:
      "Installation nach VDE – Verteilung, Beleuchtung und Gebäudetechnik in Abstimmung mit Rohbau und Ausbau.",
    intro:
      "Elektroarbeiten sind kritisch für Sicherheit und Betrieb. Wir koordinieren Trassen, Brandschottungen und Übergaben diszipliniert.",
    body: [
      "Ob Neubau oder Sanierung: Wir setzen auf normkonforme Verlegung, klare Beschriftung und prüfbare Dokumentation.",
      "Smart-Home- und Steuerungslösungen binden wir nach Bedarf ein – immer mit Blick auf Wartbarkeit und Skalierbarkeit.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "sanitaerarbeiten",
    title: "Sanitärarbeiten",
    excerpt:
      "Trinkwasser, Abwasser und Apparate – dicht, hygienisch und in enger Abstimmung mit Fliesen- und Trockenbau.",
    intro:
      "Sanitär verbindet Technik mit Nutzerkomfort. Wir achten auf Druckverluste, Schallschutz und wartungsfreundliche Verlegung.",
    body: [
      "Installationen in Nasszellen werden mit Abdichtungszonen und Herstellervorgaben abgestimmt – für dauerhafte Dichtheit.",
      "Heizungsanschlüsse und Zirkulation koordinieren wir mit Fachfirmen, damit Energieeffizienz und Komfort zusammenpassen.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "fenster-tueren",
    title: "Fenster & Türen",
    excerpt:
      "Einbau, Abdichtung und Schallschutz – energieeffiziente Elemente mit präzisen Anschlüssen zum Mauerwerk.",
    intro:
      "Fenster und Türen prägen Gebäudehülle und Nutzung. Wir setzen auf ebene Laibungen, winddichte Anschlüsse und korrekte U-Werte.",
    body: [
      "Rahmen, Dämmung und Anschlussfolien werden nach RAL-Montage und Planung ausgeführt – inklusive Abnahmeprotokoll.",
      "Brandschutz- und Schließertüren montieren wir mit passenden Zargen und Zubehör, abgestimmt auf Fluchtwege und Statik.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "fassadensanierung",
    title: "Fassadensanierung",
    excerpt:
      "Werterhalt und Energieeffizienz – Sanierung von WDVS, Klinker und Beton mit sauberer Gerüstlogistik.",
    intro:
      "Die Fassade schützt das Gebäude und prägt den Auftritt. Wir analysieren Schäden, unterbinden Feuchteeintrag und sanieren dauerhaft.",
    body: [
      "Risse, ausblühende Salze oder undichte Anschlüsse werden sachgerecht behandelt; Dämm- und Putzsysteme wählen wir passend zum Bestand.",
      "Gerüst, Arbeitsschutz und Nachbarninformation sind integraler Bestandteil unserer Baustellenorganisation.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "dacharbeiten",
    title: "Dacharbeiten",
    excerpt:
      "Abdichtung, Dämmung und Eindeckung – wetterfest, entwässerungssicher und mit klarer Garantielogik.",
    intro:
      "Das Dach schützt die Substanz. Wir sanieren flach und steil, koordinieren Entwässerung und Details an Attika und Durchdringungen.",
    body: [
      "Schichtaufbauten und Anschlüsse werden nach Flachdachrichtlinie und Herstellervorgaben ausgeführt und dokumentiert.",
      "Dachfenster, Solarvorbereitung und Arbeitssicherheit sind feste Bestandteile unserer Planung und Ausführung.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "waermepumpen",
    title: "Wärmepumpen",
    excerpt:
      "Effiziente und nachhaltige Heizlösungen für moderne Wohn- und Gewerbeobjekte.",
    intro:
      "Wärmepumpen sind das Rückgrat einer klimafreundlichen Gebäudeenergie. Wir planen Systemwahl, hydraulischen Abgleich und Übergabe so, dass Effizienz im Alltag messbar bleibt.",
    body: [
      "Luft-, Sole- oder Wasser-Wärmepumpen setzen wir normgerecht um – inklusive Speicherdimensionierung, Notstrom- und Schallschutzaspekten im Bestand.",
      "Wir koordinieren Elektro, Sanitär und ggf. Fördermittel transparent, damit Invest und Betriebskosten belastbar kalkulierbar sind.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "barrierefreies-bad-wc",
    title: "Barrierefreie Bad & WC Sanierung",
    excerpt:
      "Komfortable und sichere Badezimmerlösungen für barrierefreies Wohnen.",
    intro:
      "Barrierefreie Sanitärkonzepte verbinden Sicherheit mit Ästhetik. Wir denken Bewegungsräume, Griffe, Sitzhöhen und bodengleiche Zugänge von Anfang an mit.",
    body: [
      "Wir setzen DIN-konforme Lösungen um und stimmen Fliesen, Trockenbau und Haustechnik so, dass Nutzung und Pflege im Alltag funktionieren.",
      "Koordination mit Pflegekontexten oder Mehrgenerationenhaus ist für uns Routine – inklusive dokumentierter Abnahmen.",
    ],
    categorySlug: "ausbau-innen",
  },
  {
    slug: "solaranlagen",
    title: "Solaranlagen",
    excerpt:
      "Moderne Solartechnik für nachhaltige Energie und langfristige Kosteneinsparung.",
    intro:
      "Photovoltaik entlastet Energiekosten und stabilisiert Ihre Bilanz. Wir beraten stringente Anlagengrößen, Speicherlogik und Anschlussbedingungen.",
    body: [
      "Dachintegration, statische Nachweise und Montagekoordination führen wir strukturiert – inklusive Netzanschluss und Messkonzept.",
      "Wir dokumentieren Ertragserwartung und Schnittstellen zu Wärmepumpe oder E-Mobilität für eine skalierbare Gebäudestrategie.",
    ],
    categorySlug: "huell-technik",
  },
  {
    slug: "reinigungsservice",
    title: "Reinigungsservice",
    excerpt:
      "Professionelle Reinigungslösungen für private und gewerbliche Immobilien.",
    intro:
      "Saubere Flächen sind Teil der Werterhaltung. Wir organisieren Baureinigung, Übergabereinigung und wiederkehrende Servicefenster mit klaren Leistungskatalogen.",
    body: [
      "Ob Rohbau, Büro oder Wohnübernahme: wir arbeiten mit geprüften Mitteln, dokumentierten Checklisten und versicherungstechnisch sauberen Abläufen.",
      "Termin- und Zugangskoordination erfolgt diskret – besonders in bewohnten oder sensiblen Objekten.",
    ],
    categorySlug: "ausbau-innen",
  },
];

export const SEED_SERVICE_CATEGORIES = [
  { name: "Struktur & Rohbau", slug: "struktur-rohbau", sortOrder: 0 },
  { name: "Ausbau & Innen", slug: "ausbau-innen", sortOrder: 1 },
  { name: "Hülle & Technik", slug: "huell-technik", sortOrder: 2 },
] as const;

/** Referenz-Karten: Anzeige = diese Kategorien (CMS), nicht mehr Städte */
export const SEED_PROJECT_CATEGORIES = [
  { name: "Hochbau", slug: "hochbau", sortOrder: 0 },
  { name: "Sanierung", slug: "sanierung", sortOrder: 1 },
  { name: "Innenausbau", slug: "innenausbau", sortOrder: 2 },
  { name: "Trockenbau", slug: "trockenbau", sortOrder: 3 },
  { name: "Rohbau", slug: "rohbau", sortOrder: 4 },
  { name: "Fassadensanierung", slug: "fassadensanierung", sortOrder: 5 },
] as const;

export const SEED_PROJECTS: {
  slug: string;
  title: string;
  description: string;
  cardImage: string;
  categorySlugs: string[];
}[] = [
  {
    slug: "logistikzentrum-berlin",
    title: "Logistikzentrum",
    description:
      "Neubau eines Logistikzentrums mit klarer Hallenstruktur und effizienter Oberflächenlogistik.",
    cardImage: "/images/projects/project-1.jpg",
    categorySlugs: ["hochbau"],
  },
  {
    slug: "industriehalle-brandenburg",
    title: "Industriehalle",
    description:
      "Stahlbeton und Hallentragwerk – präzise Übergaben an Gewerke und termintreue Meilensteine.",
    cardImage: "/images/projects/project-2.jpg",
    categorySlugs: ["rohbau"],
  },
  {
    slug: "bueroensemble-muenchen",
    title: "Büroensemble",
    description:
      "Gewerblicher Neubau mit hohen Anforderungen an Fassade und Innenausbau.",
    cardImage: "/images/projects/project-3.jpg",
    categorySlugs: ["innenausbau"],
  },
  {
    slug: "sanierung-klinikum-hamburg",
    title: "Kliniksanierung",
    description:
      "Sanierung unter laufendem Betrieb – koordinierte Phasen und dokumentierte Schnittstellen.",
    cardImage: "/images/projects/project-4.jpg",
    categorySlugs: ["sanierung", "fassadensanierung"],
  },
];

/** Startseite „Über uns“: Raster verweist auf echte Leistungen (Slug → Service) */
export const SEED_FEATURED_GRID = [
  { serviceSlug: "waermepumpen", badge: "Heizung & Klima" },
  { serviceSlug: "barrierefreies-bad-wc", badge: "Barrierefrei" },
  { serviceSlug: "solaranlagen", badge: "Photovoltaik" },
  { serviceSlug: "reinigungsservice", badge: "Facility-Service" },
] as const;
