import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import {
  BadgeCheck,
  BadgeEuro,
  createIcons,
  Database,
  Files,
  Monitor,
  Plug,
  Search,
} from "lucide";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

/* The two locales share one build, so every string the page renders at runtime
 * has to exist in both. Pages declare their language on <html lang>. */
const LANG = document.documentElement.lang === "fr" ? "fr" : "en";

/* /tasks (and /fr/tasks) are Vercel rewrites to this same index.html, kept
 * as a clean, hash-free URL for outreach links. Scroll to the tasks section
 * on load instead of relying on a #tasks fragment. */
if (/^\/(fr\/)?tasks\/?$/.test(location.pathname)) {
  document.getElementById("tasks")?.scrollIntoView();
}

/* Prices read "€120" in English and "120 €" in French. */
const price = (amount) => (LANG === "fr" ? `${amount}\u00a0€` : `€${amount}`);

const TASK_COPY = {
  en: {
    "publish-exhibition": {
      label: "Website",
      title: "Publish an exhibition",
      description:
        "Text, images and dates turned into a published exhibition page.",
    },
    "opening-website": {
      label: "Website",
      title: "Prepare for an opening",
      description:
        "Homepage, exhibition and artist pages refreshed and ready before opening.",
    },
    "artist-page": {
      label: "Website",
      title: "Add an artist page",
      description:
        "Biography, works, images and basic metadata added to the gallery website.",
    },
    "update-artworks": {
      label: "Website",
      title: "Update 10 artworks",
      description:
        "Update images, captions, availability or other artwork information.",
    },
    "fix-website-issue": {
      label: "Website",
      title: "Fix a website issue",
      description:
        "Something looks wrong or stopped working? I investigate and fix one defined issue.",
    },
    "organise-database": {
      label: "Inventory",
      title: "Organise your inventory",
      description: "Clean categories, fields and structure.",
    },
    "import-artworks": {
      label: "Inventory",
      title: "Import 50 artworks",
      description: "Clean and import your spreadsheet or export.",
    },
    "clean-records": {
      label: "Inventory",
      title: "Clean 50 artwork records",
      description: "Fix inconsistent artwork information.",
    },
    "artlogic-check": {
      label: "Inventory",
      title: "Clean up your Artlogic inventory",
      description:
        "Remove duplicates, complete missing records and make your inventory reliable again.",
    },
    "collector-pdf": {
      label: "Sales material",
      title: "Collector PDF",
      description:
        "A clean, gallery-ready PDF prepared from selected artworks.",
    },
    "viewing-room": {
      label: "Sales material",
      title: "Private viewing room",
      description:
        "Prepare and publish a private online artwork selection for a collector.",
    },
    "seo-check": {
      label: "Visibility",
      title: "Artist Google indexing",
      description: "Find the main issues.",
    },
  },
  fr: {
    "publish-exhibition": {
      label: "Site web",
      title: "Publier une exposition",
      description:
        "Textes, images et dates transformés en page d’exposition publiée.",
    },
    "opening-website": {
      label: "Site web",
      title: "Préparer un vernissage",
      description:
        "Accueil, exposition et pages artistes actualisés et prêts avant l’ouverture.",
    },
    "artist-page": {
      label: "Site web",
      title: "Ajouter une page artiste",
      description:
        "Biographie, œuvres, images et informations de base ajoutées au site de la galerie.",
    },
    "update-artworks": {
      label: "Site web",
      title: "Mettre à jour 10 œuvres",
      description:
        "Images, légendes, disponibilités ou autres informations d’œuvres mises à jour.",
    },
    "fix-website-issue": {
      label: "Site web",
      title: "Corriger un problème sur le site",
      description:
        "Quelque chose s’affiche mal ou ne fonctionne plus ? Je cherche et je corrige un problème défini.",
    },
    "organise-database": {
      label: "Inventaire",
      title: "Organiser votre inventaire",
      description: "Catégories, champs et structure remis au propre.",
    },
    "import-artworks": {
      label: "Inventaire",
      title: "Importer 50 œuvres",
      description: "Nettoyage et import de votre tableur ou de votre export.",
    },
    "clean-records": {
      label: "Inventaire",
      title: "Nettoyer 50 fiches d’œuvres",
      description: "Correction des informations d’œuvres incohérentes.",
    },
    "artlogic-check": {
      label: "Inventaire",
      title: "Nettoyer votre inventaire Artlogic",
      description:
        "Doublons supprimés, fiches incomplètes complétées, et un inventaire à nouveau fiable.",
    },
    "collector-pdf": {
      label: "Supports de vente",
      title: "PDF collectionneur",
      description:
        "Un PDF net, prêt à envoyer, préparé à partir des œuvres sélectionnées.",
    },
    "viewing-room": {
      label: "Supports de vente",
      title: "Viewing room privée",
      description:
        "Préparation et mise en ligne d’une sélection privée d’œuvres pour un collectionneur.",
    },
    "seo-check": {
      label: "Visibilité",
      title: "Indexation Google artiste",
      description: "Identification des principaux problèmes.",
    },
  },
};

const UI = {
  en: {
    add: "Add task",
    added: "Added",
    remove: "Remove task",
    preview: (title) => `Preview ${title}`,
    taskCount: (n) => `${n} task${n === 1 ? "" : "s"}`,
    estimated: (total) => `${price(total)} estimated`,
    moreTasks: (n) => `+${n} more task${n === 1 ? "" : "s"}`,
    exampleTask: "Example task",
    dateLocale: "en-GB",
    mailSubject: "R.R Studio task request",
    mailBody: (lines, total) =>
      `Hello R.R Studio,\n\nI would like to request:\n${lines}\n\nEstimated total: ${price(total)}`,
  },
  fr: {
    add: "Ajouter",
    added: "Ajoutée",
    remove: "Retirer",
    preview: (title) => `Aperçu : ${title}`,
    taskCount: (n) => `${n} tâche${n === 1 ? "" : "s"}`,
    estimated: (total) => `${price(total)} estimés`,
    moreTasks: (n) =>
      `+${n} autre${n === 1 ? "" : "s"} tâche${n === 1 ? "" : "s"}`,
    exampleTask: "Tâche exemple",
    dateLocale: "fr-FR",
    mailSubject: "Demande de tâche R.R Studio",
    mailBody: (lines, total) =>
      `Bonjour R.R Studio,\n\nJe souhaiterais demander :\n${lines}\n\nTotal estimé : ${price(total)}`,
  },
};

const t = UI[LANG];

/* Copy shown inside the preview mockups. Same reason as UI above: one bundle,
 * two locales. */
const PREVIEW = {
  en: {
    recordsHeading: "Artwork records",
    recordsReady: "Clean &amp; ready",
    colArtist: "Artist",
    colTitle: "Title",
    colYear: "Year",
    colStatus: "Status",
    available: "Available",
    reserved: "Reserved",
    rowTitles: ["Untitled", "Blue Study", "Movement"],
    galleryName: "Gallery name",
    selectedWorks: "Selected works",
    privateSelection: "Private selection for a collector",
    collectorTitle: "Autumn Selection",
    collectorSubtitle: "Four recent paintings for a private collector",
    inquire: "Inquire",
    duplicateHeading: "Duplicate artist records",
    primaryRecord: "Primary record",
    possibleDuplicate: "Possible duplicate",
    artworksCount: (n) => `${n} artworks`,
    lastUpdated: "Last updated Feb 2026",
    missingBio: "Missing biography",
    resolveDuplicate: "Resolve duplicate",
    oneArtistRecord: "1 artist record",
    artworksConnected: (n) => `${n} artworks connected`,
    databaseCleaned: "Inventory cleaned",
    medium: "Medium",
    recordCount: (n) => `${n} records`,
    mergeValues: ["Oil", "Oil painting", "Oil on canvas"],
    mergeFields: "Merge fields",
    artworksUpdated: (n) => `${n} artworks updated`,
    fieldsMerged: (n) => `${n} fields merged`,
    imageFailed: "Image failed to load",
    fileMissing: "404 — file missing from server",
    bugCaption: "Sacha Elron — Oil on canvas, 150 × 150 cm",
    searchRanking: "Google · Search ranking",
    otherResults: "Page 1 — other results",
    rankingTitle: "Sacha Elron — Gallery Name",
    rankingDesc:
      "Biography, selected works, exhibitions and available artworks.",
    pageTwo: "Page 2",
    gauges: ["Performance", "Accessibility", "Best Practices", "SEO"],
    collectorArtwork: "Untitled (Cadmium Red)",
    collectorMedium: "Oil on canvas",
    bugUrl: "galleryname.com/artworks/paradise",
    rankingUrl: "galleryname.com › artists › sacha-elron",
    lighthouseUrl: "galleryname.com/artists/artist-name",
    searchQuery: '"sacha elron gallery paris"',
    previewAlt: {
      home: "Homepage preview",
      artist: "Artist page preview",
      artworks: "Artworks page preview",
      exhibition: "Exhibition preview",
    },
  },
  fr: {
    recordsHeading: "Fiches d’œuvres",
    recordsReady: "Propres et prêtes",
    colArtist: "Artiste",
    colTitle: "Titre",
    colYear: "Année",
    colStatus: "Statut",
    available: "Disponible",
    reserved: "Réservée",
    rowTitles: ["Sans titre", "Étude bleue", "Mouvement"],
    galleryName: "Nom de la galerie",
    selectedWorks: "Œuvres sélectionnées",
    privateSelection: "Sélection privée pour un collectionneur",
    collectorTitle: "Sélection d’automne",
    collectorSubtitle: "Quatre peintures récentes pour un collectionneur privé",
    inquire: "Demander",
    duplicateHeading: "Fiches artistes en double",
    primaryRecord: "Fiche principale",
    possibleDuplicate: "Doublon possible",
    artworksCount: (n) => `${n} œuvres`,
    lastUpdated: "Dernière mise à jour février 2026",
    missingBio: "Biographie manquante",
    resolveDuplicate: "Fusionner le doublon",
    oneArtistRecord: "1 fiche artiste",
    artworksConnected: (n) => `${n} œuvres rattachées`,
    databaseCleaned: "Inventaire nettoyé",
    medium: "Technique",
    recordCount: (n) => `${n} fiches`,
    mergeValues: ["Huile", "Peinture à l’huile", "Huile sur toile"],
    mergeFields: "Fusionner les champs",
    artworksUpdated: (n) => `${n} œuvres mises à jour`,
    fieldsMerged: (n) => `${n} champs fusionnés`,
    imageFailed: "L’image ne s’est pas chargée",
    fileMissing: "404 — fichier absent du serveur",
    bugCaption: "Sacha Elron — Huile sur toile, 150 × 150 cm",
    searchRanking: "Google · Positionnement",
    otherResults: "Page 1 — autres résultats",
    rankingTitle: "Sacha Elron — Nom de la galerie",
    rankingDesc:
      "Biographie, œuvres sélectionnées, expositions et œuvres disponibles.",
    pageTwo: "Page 2",
    gauges: ["Performance", "Accessibilité", "Bonnes pratiques", "SEO"],
    collectorArtwork: "Sans titre (rouge de cadmium)",
    collectorMedium: "Huile sur toile",
    bugUrl: "nomdegalerie.com/oeuvres/paradise",
    rankingUrl: "nomdegalerie.com › artistes › sacha-elron",
    lighthouseUrl: "nomdegalerie.com/artistes/nom-artiste",
    searchQuery: "« sacha elron galerie paris »",
    previewAlt: {
      home: "Aperçu de la page d’accueil",
      artist: "Aperçu de la page artiste",
      artworks: "Aperçu de la page œuvres",
      exhibition: "Aperçu de l’exposition",
    },
  },
};

const pv = PREVIEW[LANG];

/* Ids, categories and prices are shared; only the wording differs per locale. */
const tasks = [
  { id: "publish-exhibition", category: "website", price: 120 },
  { id: "opening-website", category: "website", price: 220 },
  { id: "artist-page", category: "website", price: 90 },
  { id: "update-artworks", category: "website", price: 90 },
  { id: "fix-website-issue", category: "website", price: 90 },
  { id: "organise-database", category: "database", price: 150 },
  { id: "import-artworks", category: "database", price: 220 },
  { id: "clean-records", category: "database", price: 180 },
  { id: "artlogic-check", category: "database", price: 120 },
  { id: "collector-pdf", category: "sales-material", price: 80 },
  { id: "viewing-room", category: "sales-material", price: 120 },
  { id: "seo-check", category: "visibility", price: 120 },
].map((task) => ({ ...task, ...TASK_COPY[LANG][task.id] }));

const grid = document.querySelector("#task-grid");
const summary = document.querySelector("#request-summary");
const modal = document.querySelector("#task-modal");
const invoiceDate = document.querySelector("#invoice-date");
const selected = new Set();
let activeFilter = "all";
let previewedTask = null;
/* Every layout expands a clicked card in place (grid or carousel) instead
 * of a dialog. The carousel (flex row) and the grids (CSS grid) reflow
 * differently though, so an expanded card is reset when a resize crosses
 * that boundary. Matches the .task-grid 640px breakpoint. */
const carouselQuery = window.matchMedia("(max-width: 640px)");
let expandedTaskId = null;

if (invoiceDate) {
  invoiceDate.textContent = new Intl.DateTimeFormat(t.dateLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

/* A task's deliverable drawn as a small stack of its own components, staggered
 * like a large icon (trial: exhibition page; the page's real components, shrunk and staggered). */
const TASK_GLYPHS = {
  "organise-database": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--mh"><u>${pv.medium}</u><u>${pv.recordCount(3)}</u></span>
      <span class="tg tg--ml">${pv.mergeValues.map((v) => `<i><span><b></b><s></s></span><em>${v}</em></i>`).join("")}</span>
      <span class="tg tg--mb">${pv.mergeFields}</span>
    </div>`,
  "import-artworks": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--tfile"><svg viewBox="0 0 24 24" fill="none" stroke="#1d7a46" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" /><path d="M14 2v6h6M8 13h8M8 17h8M12 11v8" /></svg><u>artworks.xlsx</u></span>
      <span class="tg tg--th">${pv.recordsHeading}</span>
      <span class="tg tg--trows"><i></i><i></i><i></i><i></i></span>
    </div>`,
  "clean-records": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--tbadge">✓ 50</span>
      <span class="tg tg--th">${pv.recordsHeading}</span>
      <span class="tg tg--trows tg--trows--clean"><i></i><i></i><i></i><i></i></span>
    </div>`,
  "artlogic-check": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--dp"><b>Sacha Elron</b><em class="ok">${pv.primaryRecord}</em><small></small></span>
      <span class="tg tg--dd"><b>Sacha&nbsp; Elron</b><em class="warn">${pv.possibleDuplicate}</em><small></small></span>
      <span class="tg tg--da">${pv.resolveDuplicate}</span>
    </div>`,
  "collector-pdf": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--ch"><small>Sacha Elron</small><strong>${pv.collectorTitle}</strong></span>
      <span class="tg tg--cm"><img src="/images/collector-pdf-artwork.jpg" alt="" /></span>
      <span class="tg tg--cmeta"><span><strong>${pv.collectorArtwork}</strong><small>${pv.collectorMedium}</small></span><u>${pv.inquire}</u></span>
    </div>`,
  "viewing-room": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--vh"><small>${pv.galleryName}</small><strong>${pv.selectedWorks}</strong><small>${pv.privateSelection}</small></span>
      <span class="tg tg--va"></span>
      <span class="tg tg--vn">01 — 12</span>
    </div>`,
  "seo-check": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--rh"><u>${pv.searchRanking}</u><em>${pv.searchQuery}</em></span>
      <span class="tg tg--rp"><i></i><i></i><i></i></span>
      <span class="tg tg--rr"><b>14</b><span><small>${pv.rankingUrl}</small><strong>${pv.rankingTitle}</strong></span><em>${pv.pageTwo}</em></span>
    </div>`,
  "fix-website-issue": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--bar"><i></i><i></i><i></i><u>${pv.bugUrl}</u></span>
      <span class="tg tg--broken"><em>1</em><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="4" y="4" width="40" height="40" rx="4" /><circle cx="16" cy="16" r="4" /><path d="M4 32L16 22L26 30L34 20L44 30" /><line x1="2" y1="2" x2="46" y2="46" /></svg><b>404</b></span>
      <span class="tg tg--caption"><strong>Paradise, 2019</strong><small></small></span>
      <span class="tg tg--note"><em>1</em><span><strong>${pv.imageFailed}</strong><small>${pv.fileMissing}</small></span></span>
    </div>`,
  "update-artworks": `<div class="task-glyph task-glyph--tall" aria-hidden="true">
      <span class="tg tg--pill">Selected Works</span>
      <span class="tg tg--w1"><img src="/mockups/artworks/g1.jpg" alt="" /><i><u></u><b></b><em></em></i></span>
      <span class="tg tg--w2"><img src="/mockups/artworks/g2.jpg" alt="" /><i><u></u><b></b><em></em></i></span>
      <span class="tg tg--w4"><img src="/mockups/artworks/g4.jpg" alt="" /><i><u></u><b></b><em></em></i></span>
      <span class="tg tg--w5"><img src="/mockups/artworks/g5.jpg" alt="" /><i><u></u><b></b><em></em></i></span>
    </div>`,
  "artist-page": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--portrait"><img src="/mockups/artist/portrait.jpg" alt="" /></span>
      <span class="tg tg--name"><b>Sacha Elron</b><small>Born 1975, US</small></span>
      <span class="tg tg--bio">Sacha Elron explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields.</span>
      <span class="tg tg--works"><img src="/mockups/artist/work-1.jpg" alt="" /><img src="/mockups/artist/work-2.jpg" alt="" /><img src="/mockups/artist/work-3.jpg" alt="" /></span>
    </div>`,
  "opening-website": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--photo"><img src="/mockups/your-friends.jpg" alt="" /></span>
      <span class="tg tg--nav"><b>GALERIE</b><i>Exhibitions &nbsp;Artists &nbsp;Fairs</i></span>
      <span class="tg tg--hero"><b>Sacha Elron</b><em>Your friends</em></span>
      <span class="tg tg--cta">Learn more</span>
    </div>`,
  "publish-exhibition": `<div class="task-glyph" aria-hidden="true">
      <span class="tg tg--image"><img src="/mockups/your-friends.jpg" alt="" /></span>
      <span class="tg tg--title">Sacha Elron — <em>Your friends</em></span>
      <span class="tg tg--text">A presentation of recent paintings and works on paper exploring friendship, memory, and shared light. The exhibition brings together a focused selection of pieces conceived as a single environment.</span>
      <span class="tg tg--btns"><b>Artwork Inquiry</b><u>View artist</u></span>
    </div>`,
};

function renderTasks() {
  expandedTaskId = null;
  const visibleTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((task) => task.category === activeFilter);
  grid.innerHTML = visibleTasks
    .map(
      (task) => `
    <article class="task-card${TASK_GLYPHS[task.id] ? " has-glyph" : ""}" data-preview-id="${task.id}" tabindex="0" role="button" aria-expanded="false" aria-label="${t.preview(task.title)}">
      <div class="task-card__body">
        <p class="task-category">${task.label}</p><h3>${task.title}</h3><p class="task-price">${price(task.price)}</p><p class="task-description">${task.description}</p>
        <button class="task-add ${selected.has(task.id) ? "is-selected" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${selected.has(task.id)}">${selected.has(task.id) ? t.added : t.add}</button>
      </div>
      <div class="task-card__media" aria-hidden="true"></div>
      ${TASK_GLYPHS[task.id] || ""}
    </article>`,
    )
    .join("");
}

function updateSummary() {
  const selectedTasks = tasks.filter((task) => selected.has(task.id));
  const total = selectedTasks.reduce((sum, task) => sum + task.price, 0);
  const wasVisible = !summary.hidden;
  const requestItems = document.querySelector("#request-items");
  document.querySelector("#task-count").textContent = t.taskCount(
    selectedTasks.length,
  );
  document.querySelector("#task-total").textContent = t.estimated(total);
  document.querySelector("#request-total").textContent = price(total);
  requestItems.replaceChildren();
  selectedTasks.slice(0, 2).forEach((task) => {
    const item = document.createElement("div");
    item.className = "request-summary__item";
    const title = document.createElement("span");
    const amount = document.createElement("strong");
    title.textContent = task.title;
    amount.textContent = price(task.price);
    item.append(title, amount);
    requestItems.append(item);
  });
  if (selectedTasks.length > 2) {
    const more = document.createElement("div");
    more.className = "request-summary__item request-summary__item--more";
    const label = document.createElement("span");
    label.textContent = t.moreTasks(selectedTasks.length - 2);
    more.append(label, document.createElement("span"));
    requestItems.append(more);
  }
  const lines = selectedTasks
    .map((task) => `- ${task.title} (${price(task.price)})`)
    .join("\n");
  document.querySelector("#request-tasks").href =
    `mailto:studio@rrstudio.online?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody(lines, total))}`;
  if (!selectedTasks.length) {
    summary.classList.remove("is-visible", "is-updated");
    summary.hidden = true;
  } else {
    summary.hidden = false;
    if (!wasVisible) {
      requestAnimationFrame(() => summary.classList.add("is-visible"));
    } else {
      summary.classList.remove("is-updated");
      requestAnimationFrame(() => {
        summary.classList.add("is-updated");
        window.setTimeout(() => summary.classList.remove("is-updated"), 280);
      });
    }
  }
  updateInvoice(selectedTasks, total);
}

function updateInvoice(selectedTasks, total) {
  const invoiceItems = document.querySelector("#invoice-items");
  if (!invoiceItems) return;
  const displayedTasks = selectedTasks.length ? selectedTasks : [tasks[0]];
  const displayedTotal = selectedTasks.length ? total : tasks[0].price;
  invoiceItems.innerHTML = displayedTasks
    .map(
      (task) =>
        `<div class="invoice-row invoice-row--item"><div><strong>${task.title}</strong><small>${selectedTasks.length ? task.label : t.exampleTask}</small></div><span>1</span><span>${price(task.price)}</span><strong>${price(task.price)}</strong></div>`,
    )
    .join("");
  document.querySelector("#invoice-subtotal").textContent =
    price(displayedTotal);
  document.querySelector("#invoice-total").textContent = price(displayedTotal);
}

const websitePreviewImages = {
  "opening-website": { src: "home-page.png", alt: pv.previewAlt.home },
  "artist-page": { src: "artist-page.png", alt: pv.previewAlt.artist },
  "update-artworks": { src: "artworks-page.png", alt: pv.previewAlt.artworks },
};
const defaultWebsitePreviewImage = {
  src: "exhibition-page.png",
  alt: pv.previewAlt.exhibition,
};

function exhibitionPageMarkup() {
  return `<div class="preview-exhibit">
      <p class="ex-crumb ex-chrome"><u>Exhibitions</u> — Your friends</p>
      <div class="ex-main">
        <div class="ex-side">
          <div class="ex-meta ex-chrome"><small>Artist</small><u>Sacha Elron</u><small>Dates</small><span>Feb 12 — Mar 22, 2026</span><small>Location</small><span>Galerie, Paris — Turenne</span></div>
          <div class="ex-btns ex-slot" data-slot="btns"><b>Artwork Inquiry</b><i>View artist</i></div>
          <u class="ex-all ex-chrome">All exhibitions</u>
        </div>
        <div class="ex-copy">
          <h2 class="ex-title ex-slot" data-slot="title">Sacha Elron — <em>Your friends</em></h2>
          <div class="ex-text ex-slot" data-slot="text">
            <p>A presentation of recent paintings and works on paper exploring friendship, memory, and shared light. The exhibition brings together a focused selection of pieces conceived as a single environment.</p>
            <p>Arranged as a sequence of rooms, the works invite a slow reading: color fields, soft gradients, and restrained surfaces echo the quiet of the gallery itself.</p>
            <p>Private viewing and availability: contact the gallery.</p>
          </div>
        </div>
      </div>
      <div class="ex-photo ex-slot" data-slot="image"><img src="/mockups/your-friends-large.jpg" alt="" /></div>
    </div>`;
}

function openingPageMarkup() {
  return `<div class="preview-exhibit preview-opening">
      <div class="op-photo ex-slot" data-slot="photo"><img src="/mockups/your-friends-large.jpg" alt="" /></div>
      <div class="op-shade ex-chrome"></div>
      <div class="op-nav ex-slot" data-slot="nav"><b>GALERIE</b><span><i>Exhibitions</i><i>Artists</i><i>Fairs</i><i>News</i><i>About</i><u></u></span></div>
      <div class="op-hero ex-slot" data-slot="hero"><small>PARIS</small><h2>Sacha Elron</h2><h3>Your friends</h3><p>Feb 12 — Mar 22, 2026</p></div>
      <div class="op-cta ex-slot" data-slot="cta">Learn more</div>
      <div class="op-dots ex-chrome"><i></i><i></i><i></i><i></i></div>
    </div>`;
}

function artistPageMarkup() {
  return `<div class="preview-exhibit preview-artist">
      <div class="ar-top">
        <div class="ar-portrait ex-slot" data-slot="portrait"><img src="/mockups/artist/portrait.jpg" alt="" /></div>
        <div class="ar-copy">
          <div class="ar-name ex-slot" data-slot="name"><h2>Sacha Elron</h2><small>Born 1975, US</small></div>
          <div class="ar-bio ex-slot" data-slot="bio">
            <p>Sacha Elron explores the boundaries of landscape and abstraction through a deeply personal visual vocabulary. His paintings, often rendered in rich, saturated color fields, evoke a contemplative stillness that hovers between representation and pure sensation.</p>
            <p>Working primarily with oil on canvas, his practice distills nature into its most essential forms — solitary trees, expansive skies, and luminous horizons emerge from layers of pigment with an almost meditative quality.</p>
          </div>
        </div>
      </div>
      <div class="ar-label ex-chrome"><span>SELECTED WORKS</span><b>Selected Works</b></div>
      <div class="ar-works ex-slot" data-slot="works"><img src="/mockups/artist/work-1.jpg" alt="" /><img src="/mockups/artist/work-2.jpg" alt="" /><img src="/mockups/artist/work-3.jpg" alt="" /></div>
    </div>`;
}

function artworksPageMarkup() {
  const card = (n, slot, title, year, medium, dims, extra = "") =>
    `<figure class="aw2-card ${extra}"${slot ? ` data-slot="${slot}"` : ""}><img src="/mockups/artworks/t${n}.jpg" alt="" /><figcaption><small>Sacha Elron</small><b>${title}, <span>${year}</span></b><em>${medium}</em><em>${dims}</em></figcaption></figure>`;
  return `<div class="preview-exhibit preview-works">
      <div class="aw2-head"><span class="aw2-label ex-chrome">SELECTED WORKS</span><span class="aw2-pill ex-slot" data-slot="pill">Selected Works</span></div>
      <div class="aw2-grid">
        ${card(1, "w1", "Amber Nocturne", "2025", "Oil on canvas", "150 × 150 cm", "ex-slot")}
        ${card(2, "w2", "Crimson Field", "2024", "Oil on linen", "130 × 110 cm", "ex-slot")}
        ${card(3, "", "Evening field", "2023", "Acrylic on canvas", "120 × 120 cm", "ex-chrome")}
        ${card(4, "w4", "Dawn Study No. 7", "2023", "Acrylic", "30 × 30 cm", "ex-slot")}
        ${card(5, "w5", "Sage Interval", "2022", "Acrylic on canvas", "100 × 140 cm", "ex-slot")}
      </div>
    </div>`;
}

function previewMarkup(task) {
  if (task.id === "publish-exhibition") return exhibitionPageMarkup();
  if (task.id === "update-artworks") return artworksPageMarkup();
  if (task.id === "artist-page") return artistPageMarkup();
  if (task.id === "opening-website") return openingPageMarkup();
  if (task.category === "website") {
    if (task.id === "fix-website-issue") return bugMarkup();
    const image = websitePreviewImages[task.id] || defaultWebsitePreviewImage;
    return `<div class="preview-fullbleed"><img src="/images/${image.src}" alt="${image.alt}" /></div>`;
  }
  if (task.category === "database") {
    if (task.id === "artlogic-check") return dedupeMarkup();
    if (task.id === "organise-database") return mergeFieldsMarkup();
    return `<div class="preview-table"><div class="preview-table__heading">${pv.recordsHeading} <span>${pv.recordsReady}</span></div><div class="preview-row preview-row--head"><b>${pv.colArtist}</b><b>${pv.colTitle}</b><b>${pv.colYear}</b><b>${pv.colStatus}</b></div><div class="preview-row"><span>A. Martin</span><span>${pv.rowTitles[0]}</span><span>2024</span><span>${pv.available}</span></div><div class="preview-row"><span>J. Smith</span><span>${pv.rowTitles[1]}</span><span>2023</span><span>${pv.reserved}</span></div><div class="preview-row"><span>L. Chen</span><span>${pv.rowTitles[2]}</span><span>2022</span><span>${pv.available}</span></div></div>`;
  }
  if (task.category === "sales-material") {
    if (task.id === "collector-pdf") return collectorPdfMarkup();
    return `<div class="preview-pdf"><div><small>${pv.galleryName}</small><h3>${pv.selectedWorks}</h3><p>${pv.privateSelection}</p></div><div class="preview-pdf__art"></div><span>01 — 12</span></div>`;
  }
  if (task.category === "visibility" && task.id === "seo-check")
    return rankingMarkup();
  const gauges = [58, 96, 87, 71].map((score, i) => ({
    label: pv.gauges[i],
    score,
  }));
  return `<div class="preview-lighthouse"><div class="preview-lighthouse__head"><span class="preview-lighthouse__logo">Lighthouse report</span><span class="preview-lighthouse__url">${pv.lighthouseUrl}</span></div><div class="preview-lighthouse__grid">${gauges.map((gauge) => lighthouseGauge(gauge.label, gauge.score)).join("")}</div></div>`;
}

function collectorPdfMarkup() {
  return `<div class="preview-collector">
      <div class="preview-collector__head">
        <p class="preview-collector__eyebrow">Sacha Elron</p>
        <h3>${pv.collectorTitle}</h3>
        <p class="preview-collector__subtitle">${pv.collectorSubtitle}</p>
      </div>
      <div class="preview-collector__media"><img src="/images/collector-pdf-artwork.jpg" alt="${pv.collectorArtwork}" /></div>
      <div class="preview-collector__meta">
        <div>
          <p class="preview-collector__artist">Sacha Elron</p>
          <p class="preview-collector__title"><em>${pv.collectorArtwork}</em>, 2024</p>
          <p class="preview-collector__detail">${pv.collectorMedium}</p>
          <p class="preview-collector__detail">190 × 170 cm</p>
        </div>
        <span class="preview-collector__inquire">${pv.inquire}</span>
      </div>
    </div>`;
}

function dedupeMarkup() {
  return `<div class="preview-dedupe" aria-hidden="true">
      <div class="preview-dedupe__panel">
        <div class="preview-dedupe__field"><span>${pv.duplicateHeading}</span></div>
        <div class="preview-dedupe__stack">
          <div class="preview-dedupe__card preview-dedupe__card--primary">
            <div class="preview-dedupe__card-head"><b>Sacha Elron</b><span class="preview-dedupe__status preview-dedupe__status--primary">${pv.primaryRecord}</span></div>
            <small>${pv.artworksCount(12)}</small>
            <small>${pv.lastUpdated}</small>
          </div>
          <div class="preview-dedupe__card preview-dedupe__card--duplicate">
            <div class="preview-dedupe__card-head"><b>Sacha&nbsp; Elron</b><span class="preview-dedupe__status preview-dedupe__status--duplicate">${pv.possibleDuplicate}</span></div>
            <small>${pv.artworksCount(4)}</small>
            <small>${pv.missingBio}</small>
          </div>
        </div>
        <div class="preview-dedupe__action"><span class="preview-dedupe__action-btn">${pv.resolveDuplicate}</span></div>
        <div class="preview-dedupe__result">
          <span class="preview-dedupe__check">✓</span>
          <div><b>${pv.oneArtistRecord}</b><small>${pv.artworksConnected(16)}</small></div>
        </div>
        <p class="preview-dedupe__status-line"><i class="preview-dedupe__dot"></i>${pv.databaseCleaned}</p>
      </div>
    </div>`;
}

const mergeRows = ["Paradise, 2019", "Reverie, 2021", "Coastline, 2020"].map(
  (title, i) => ({
    title,
    value: pv.mergeValues[i],
  }),
);

function mergeFieldsMarkup() {
  const rows = mergeRows
    .map(
      (row) =>
        `<li class="preview-merge__row"><div><b>Sacha Elron</b><small>${row.title}</small></div><span class="preview-merge__tag">${row.value}</span></li>`,
    )
    .join("");
  return `<div class="preview-merge" aria-hidden="true">
      <div class="preview-merge__panel">
        <div class="preview-merge__field"><span>${pv.medium}</span><span>${pv.recordCount(3)}</span></div>
        <ul class="preview-merge__list">${rows}</ul>
        <div class="preview-merge__action"><span class="preview-merge__action-btn">${pv.mergeFields}</span></div>
        <div class="preview-merge__result">
          <div><b>Sacha Elron</b><small>${pv.artworksUpdated(3)}</small></div>
          <span class="preview-merge__tag preview-merge__tag--pass">${pv.mergeValues[2]}</span>
        </div>
        <p class="preview-merge__status"><i class="preview-merge__dot"></i>${pv.fieldsMerged(3)}</p>
      </div>
    </div>`;
}

function bugMarkup() {
  return `<div class="preview-bug"><div class="preview-bug__bar ex-slot" data-slot="bar"><i></i><i></i><i></i><span>${pv.bugUrl}</span></div><div class="preview-bug__page"><small class="ex-chrome">${pv.galleryName}</small><div class="preview-bug__broken ex-slot" data-slot="broken"><span class="preview-bug__pin">1</span><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="40" height="40" rx="4" /><circle cx="16" cy="16" r="4" /><path d="M4 32L16 22L26 30L34 20L44 30" /><line x1="2" y1="2" x2="46" y2="46" /></svg><span class="preview-bug__code">404</span></div><div class="preview-bug__caption ex-slot" data-slot="caption"><h3>Paradise, 2019</h3><p>${pv.bugCaption}</p></div></div><div class="preview-bug__note ex-slot" data-slot="note"><span class="preview-bug__note-pin">1</span><div><b>${pv.imageFailed}</b><small>${pv.fileMissing}</small></div></div></div>`;
}

function rankingMarkup() {
  const skeletonRows = Array.from({ length: 4 })
    .map(
      () =>
        `<div class="preview-ranking__row"><span class="preview-ranking__bar preview-ranking__bar--url"></span><span class="preview-ranking__bar preview-ranking__bar--title"></span><span class="preview-ranking__bar preview-ranking__bar--body"></span></div>`,
    )
    .join("");
  const pages = [1, 2, 3, 4, 5]
    .map(
      (page) =>
        `<span class="${page === 2 ? "is-current" : ""}">${page}</span>`,
    )
    .join("");
  return `<div class="preview-ranking"><div class="preview-ranking__head"><span class="preview-ranking__label">${pv.searchRanking}</span><span class="preview-ranking__query">${pv.searchQuery}</span></div><div class="preview-ranking__page1"><span class="preview-ranking__page1-label">${pv.otherResults}</span>${skeletonRows}</div><div class="preview-ranking__pagination">${pages}</div><div class="preview-ranking__result"><span class="preview-ranking__position">14</span><div><p class="preview-ranking__url">${pv.rankingUrl}</p><h3>${pv.rankingTitle}</h3><p class="preview-ranking__desc">${pv.rankingDesc}</p></div><span class="preview-ranking__flag">${pv.pageTwo}</span></div></div>`;
}

const LIGHTHOUSE_RADIUS = 34;
const LIGHTHOUSE_CIRCUMFERENCE = 2 * Math.PI * LIGHTHOUSE_RADIUS;

function lighthouseTier(score) {
  if (score >= 90) return "green";
  if (score >= 50) return "orange";
  return "red";
}

function lighthouseGauge(label, score) {
  const offset = LIGHTHOUSE_CIRCUMFERENCE * (1 - score / 100);
  return `<div class="preview-lighthouse__gauge preview-lighthouse__gauge--${lighthouseTier(score)}"><div class="preview-lighthouse__ring"><svg viewBox="0 0 80 80"><circle class="track" cx="40" cy="40" r="${LIGHTHOUSE_RADIUS}" /><circle class="value" cx="40" cy="40" r="${LIGHTHOUSE_RADIUS}" style="stroke-dasharray:${LIGHTHOUSE_CIRCUMFERENCE};stroke-dashoffset:${offset}" /></svg><span class="preview-lighthouse__score">${score}</span></div><p>${label}</p></div>`;
}

function openPreview(task) {
  previewedTask = task;
  document.querySelector("#modal-category").textContent = task.label;
  document.querySelector("#modal-task-title").textContent = task.title;
  document.querySelector("#modal-price").textContent = price(task.price);
  document.querySelector("#modal-description").textContent = task.description;
  const previewEl = document.querySelector("#modal-preview");
  previewEl.innerHTML = previewMarkup(task);
  previewEl.classList.toggle(
    "modal-preview--fullbleed",
    task.category === "website" ||
      task.category === "visibility" ||
      task.id === "artlogic-check" ||
      task.id === "organise-database" ||
      task.id === "collector-pdf",
  );
  const mergeEl = previewEl.querySelector(".preview-merge");
  if (mergeEl) requestAnimationFrame(() => mergeEl.classList.add("is-inview"));
  const dedupeEl = previewEl.querySelector(".preview-dedupe");
  if (dedupeEl)
    requestAnimationFrame(() => dedupeEl.classList.add("is-inview"));
  document.querySelector("#modal-add").textContent = selected.has(task.id)
    ? t.remove
    : t.add;
  modal.showModal();
}

/* Desktop card expansion: grows the clicked card to two grid columns and
 * fills its media pane with the same previewMarkup() used by the dialog,
 * animating the whole reflow (the expanding card and every card it pushes)
 * with GSAP Flip so the grid settles back into a coherent 3-up rhythm. */
/* The preview mockups are laid out for the modal's ~700px pane. On the
 * mobile carousel the media pane is barely 166px wide, so instead of
 * reflowing each mockup we give it a roomy design box and scale the whole
 * thing down to land exactly on the pane — the same way the full-bleed
 * screenshots read as miniatures. Measured after the DOM mutation but
 * before Flip starts tweening, when the layout is already final. */
const PREVIEW_DESIGN_WIDTH = 560;

function scalePreviewToPane(media) {
  media.style.removeProperty("--preview-scale");
  media.style.removeProperty("--preview-h");
  media.style.removeProperty("--preview-w");
  media.style.removeProperty("--preview-x");
  const root = media.querySelector("[data-morph]");
  if (!carouselQuery.matches && !root) return;
  const paneWidth = media.clientWidth;
  const paneHeight = media.clientHeight;
  if (!paneWidth || !paneHeight) return;
  let scale = paneWidth / PREVIEW_DESIGN_WIDTH;
  let height = paneHeight / scale;
  media.style.setProperty("--preview-w", `${PREVIEW_DESIGN_WIDTH}px`);
  if (root && !root.matches(".preview-pdf")) {
    // The page is drawn at its design width. If its content is taller than the room
    // the pane leaves at that scale (wide screens), shrink the whole page to fit and
    // centre it, instead of letting content hang out of the card.
    root.style.height = "auto";
    const natural = root.scrollHeight;
    root.style.removeProperty("height");
    if (natural > height) {
      scale = paneHeight / natural;
      height = natural;
    }
    media.style.setProperty(
      "--preview-x",
      `${Math.max(0, (paneWidth - PREVIEW_DESIGN_WIDTH * scale) / 2)}px`,
    );
  }
  media.style.setProperty("--preview-scale", `${scale}`);
  media.style.setProperty("--preview-h", `${height}px`);
}

/* Pages built from the older preview markup get their morph slots tagged here:
 * `slots` are the real elements the glyph tiles fly to, `chrome` is what builds in
 * afterwards. Pages written for the morph (exhibition, homepage...) tag themselves. */
const TABLE_MAP = {
  slots: { th: ".preview-table__heading", trows: ".preview-table__rows" },
  wrap: (root) => {
    const rows = [...root.querySelectorAll(".preview-row")];
    if (!rows.length) return;
    const box = document.createElement("div");
    box.className = "preview-table__rows";
    rows[0].before(box);
    rows.forEach((row) => box.append(row));
  },
};
const MORPH_MAP = {
  "organise-database": {
    slots: { mh: ".preview-merge__field", ml: ".preview-merge__list", mb: ".preview-merge__action-btn" },
  },
  "import-artworks": TABLE_MAP,
  "clean-records": TABLE_MAP,
  "artlogic-check": {
    slots: {
      dp: ".preview-dedupe__card--primary",
      dd: ".preview-dedupe__card--duplicate",
      da: ".preview-dedupe__action-btn",
    },
    chrome: [".preview-dedupe__field"],
  },
  "collector-pdf": {
    slots: { ch: ".preview-collector__head", cm: ".preview-collector__media", cmeta: ".preview-collector__meta" },
  },
  "viewing-room": {
    slots: { vh: ".preview-pdf > div", va: ".preview-pdf__art", vn: ".preview-pdf > span" },
  },
  "seo-check": {
    slots: { rh: ".preview-ranking__head", rp: ".preview-ranking__page1", rr: ".preview-ranking__result" },
    chrome: [".preview-ranking__pagination"],
  },
};

function prepareMorph(task, media) {
  const root = media.firstElementChild;
  if (!root || !TASK_GLYPHS[task.id]) return;
  root.setAttribute("data-morph", "");
  const cfg = MORPH_MAP[task.id];
  if (!cfg) return;
  cfg.wrap?.(root);
  Object.entries(cfg.slots).forEach(([key, selector]) => {
    const el = root.querySelector(selector);
    if (!el) return;
    el.classList.add("ex-slot");
    el.dataset.slot = key;
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
  });
  (cfg.chrome || []).forEach((selector) =>
    root.querySelectorAll(selector).forEach((el) => el.classList.add("ex-chrome")),
  );
}

/* Glyph -> page: each glyph tile travels to its slot in the live exhibition
 * mockup and swaps with the real element; the rest of the page then builds in
 * around them. Slots and chrome start hidden (.is-morph). */
const FLY_ORDER = { btns: 0, title: 1, text: 2, image: 3, photo: 0, nav: 1, hero: 2, cta: 3, portrait: 0, name: 1, bio: 2, works: 3, w1: 0, w2: 1, w3: 2, w4: 2, w5: 3, pill: 4, bar: 0, broken: 1, caption: 2, note: 3 };

function morphGlyph(card) {
  const glyph = card.querySelector(".task-glyph");
  const page = card.querySelector("[data-morph]");
  if (!glyph || !page) return;
  const tiles = [...glyph.querySelectorAll(".tg")];
  gsap.killTweensOf(tiles);
  const slots = [...page.querySelectorAll(".ex-slot")];
  const tl = gsap.timeline({
    onComplete: () =>
      slots.forEach((slot) => {
        gsap.set(slot, { clearProps: "transform,clipPath" });
        ["--ex-extra", "--ex-a", "--ex-r", "--ex-bg"].forEach((p) => slot.style.removeProperty(p));
      }),
  });
  // Shared-element transition: each real element of the page starts exactly where
  // its glyph tile is (uniformly scaled down, so nothing stretches) and travels to
  // its place with transforms only — no layout work per frame. The tile's shape is
  // matched at the start by a backing card (::before, grows away) and a clip-path
  // (shrinks away), both paint-only.
  tiles.forEach((tile) => {
    const key = [...tile.classList].find((c) => c.startsWith("tg--"))?.slice(4);
    const slot = page.querySelector(`[data-slot="${key}"]`);
    if (!slot) {
      // A tile with no counterpart on the page simply dissolves as the others fly.
      tl.to(tile, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.05);
      return;
    }
    const to = slot.getBoundingClientRect();
    const from = tile.getBoundingClientRect();
    const W = slot.offsetWidth || to.width;
    const H = slot.offsetHeight || to.height;
    const pageScale = to.width / W;
    const k0 = from.width / to.width;
    const tileBg = getComputedStyle(tile).backgroundColor;
    const tileH = (from.height * W) / from.width;
    const clip = Math.max(0, H - tileH);
    const extra = Math.max(0, tileH - H);
    const bottom = clip > 0 ? clip : -(extra + 24);
    const at = (FLY_ORDER[key] ?? tiles.indexOf(tile)) * 0.05;
    tl.set(
      slot,
      {
        opacity: 1,
        transformOrigin: "0 0",
        x: (from.left - to.left) / pageScale,
        y: (from.top - to.top) / pageScale,
        scale: k0,
        clipPath: `inset(-24px -24px ${bottom}px -24px)`,
        "--ex-extra": `${extra}px`,
        "--ex-a": tileBg === "rgba(0, 0, 0, 0)" ? 0 : 1,
        "--ex-bg": tileBg,
        "--ex-r": `${7 / k0}px`,
      },
      at,
    );
    tl.set(tile, { opacity: 0 }, at);
    tl.to(
      slot,
      {
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "inset(-24px -24px -24px -24px)",
        "--ex-extra": "0px",
        "--ex-a": 0,
        "--ex-r": "0px",
        duration: 0.55,
        ease: "power3.inOut",
        force3D: true,
      },
      at,
    );
  });
  tl.fromTo(
    page.querySelectorAll(".ex-chrome"),
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.035 },
    0.4,
  );
}

function resetGlyph(card) {
  const tiles = card.querySelectorAll(".task-glyph .tg");
  if (!tiles.length) return;
  gsap.killTweensOf(tiles);
  gsap.set(tiles, { clearProps: "transform,opacity,boxShadow,width,height,fontSize,lineHeight" });
}

function collapseCard(card) {
  card.classList.remove("is-expanded");
  card.setAttribute("aria-expanded", "false");
  resetGlyph(card);
  const media = card.querySelector(".task-card__media");
  if (!media) return;
  media.innerHTML = "";
  media.style.removeProperty("--preview-scale");
  media.style.removeProperty("--preview-h");
  media.style.removeProperty("--preview-w");
}

function expandCard(task, card) {
  const state = Flip.getState(grid.querySelectorAll(".task-card"));
  if (expandedTaskId && expandedTaskId !== task.id) {
    const previous = grid.querySelector(
      `.task-card[data-preview-id="${expandedTaskId}"]`,
    );
    if (previous) collapseCard(previous);
  }
  card.classList.add("is-expanded");
  card.setAttribute("aria-expanded", "true");
  const media = card.querySelector(".task-card__media");
  media.innerHTML = previewMarkup(task);
  prepareMorph(task, media);
  scalePreviewToPane(media);
  const hasGlyph = Boolean(
    card.querySelector(".task-glyph") && media.querySelector("[data-morph]"),
  );
  if (hasGlyph) media.querySelector("[data-morph]").classList.add("is-morph");
  expandedTaskId = task.id;
  // Flip's absolute:true pulls every card out of the flow for the duration
  // of the animation, so the grid — which gets its height from those
  // cards — would collapse and yank everything below it up the page.
  // Pin the grid to its current height until the flip settles.
  grid.style.height = `${grid.getBoundingClientRect().height}px`;
  Flip.from(state, {
    absolute: true,
    duration: hasGlyph ? 0.45 : 0.6,
    ease: "power2.inOut",
    scale: false,
    onComplete: () => {
      grid.style.height = "";
      if (hasGlyph) morphGlyph(card);
      // Nudge the carousel's own horizontal scroll only — scrollIntoView()
      // also re-scrolls the page vertically to "nearest", which yanked the
      // section below the grid up on every tap.
      if (!carouselQuery.matches) return;
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      if (cardRect.right > gridRect.right) {
        grid.scrollLeft += cardRect.right - gridRect.right;
      } else if (cardRect.left < gridRect.left) {
        grid.scrollLeft -= gridRect.left - cardRect.left;
      }
    },
  });
  gsap.fromTo(
    media,
    { opacity: 0 },
    { delay: 0.1, duration: 0.3, opacity: 1 },
  );
}

function collapseExpandedCard() {
  if (!expandedTaskId) return;
  const state = Flip.getState(grid.querySelectorAll(".task-card"));
  const card = grid.querySelector(
    `.task-card[data-preview-id="${expandedTaskId}"]`,
  );
  if (card) collapseCard(card);
  expandedTaskId = null;
  grid.style.height = `${grid.getBoundingClientRect().height}px`;
  Flip.from(state, {
    absolute: true,
    duration: 0.5,
    ease: "power2.inOut",
    scale: false,
    onComplete: () => {
      grid.style.height = "";
    },
  });
}

function toggleCardPreview(task, card) {
  if (expandedTaskId === task.id) {
    collapseExpandedCard();
  } else {
    expandCard(task, card);
  }
}

document.querySelector(".task-filters").addEventListener("click", (event) => {
  const filter = event.target.closest(".filter");
  if (!filter) return;
  activeFilter = filter.dataset.filter;
  document
    .querySelectorAll(".filter")
    .forEach((item) => item.classList.toggle("is-active", item === filter));
  renderTasks();
});
document.querySelector(".category-strip").addEventListener("click", (event) => {
  const link = event.target.closest(".category-link");
  if (!link) return;
  activeFilter = link.dataset.category;
  document
    .querySelectorAll(".filter")
    .forEach((item) =>
      item.classList.toggle("is-active", item.dataset.filter === activeFilter),
    );
  renderTasks();
});
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".task-add");
  if (!button) {
    const card = event.target.closest(".task-card");
    if (card)
      toggleCardPreview(
        tasks.find((task) => task.id === card.dataset.previewId),
        card,
      );
    return;
  }
  const { taskId } = button.dataset;
  selected.has(taskId) ? selected.delete(taskId) : selected.add(taskId);
  renderTasks();
  updateSummary();
});
grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".task-card");
  if (!card) return;
  event.preventDefault();
  toggleCardPreview(
    tasks.find((task) => task.id === card.dataset.previewId),
    card,
  );
});
document.addEventListener("click", (event) => {
  if (!expandedTaskId || event.target.closest(".task-card")) return;
  collapseExpandedCard();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && expandedTaskId) collapseExpandedCard();
});
carouselQuery.addEventListener("change", () => collapseExpandedCard());
document
  .querySelector(".modal-close")
  .addEventListener("click", () => modal.close());
document.querySelector("#modal-add").addEventListener("click", () => {
  selected.has(previewedTask.id)
    ? selected.delete(previewedTask.id)
    : selected.add(previewedTask.id);
  renderTasks();
  updateSummary();
  modal.close();
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

renderTasks();
updateSummary();
createIcons({
  icons: { BadgeCheck, BadgeEuro, Database, Files, Monitor, Plug, Search },
});

// Drag the estimate ticket down to collapse it to a peeking strip, or up to reopen it.
const dragZone = summary.querySelector(".request-summary__drag-zone");
if (dragZone) {
  const PEEK = 56;
  let dragging = false;
  let startY = 0;
  let startOffset = 0;
  let cardHeight = 0;
  let moved = 0;

  const setCollapsed = (collapsed) =>
    summary.classList.toggle("is-collapsed", collapsed);

  dragZone.addEventListener("pointerdown", (event) => {
    dragging = true;
    moved = 0;
    startY = event.clientY;
    cardHeight = summary.getBoundingClientRect().height;
    startOffset = summary.classList.contains("is-collapsed")
      ? cardHeight - PEEK
      : 0;
    summary.classList.add("is-dragging");
    dragZone.setPointerCapture(event.pointerId);
  });

  dragZone.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientY - startY;
    moved = Math.abs(delta);
    const next = Math.min(Math.max(startOffset + delta, 0), cardHeight - PEEK);
    summary.style.transform = `translate(-50%, ${next}px)`;
  });

  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    summary.classList.remove("is-dragging");
    summary.style.transform = "";
    if (moved < 6) {
      setCollapsed(!summary.classList.contains("is-collapsed"));
    } else {
      const delta = event.clientY - startY;
      const finalOffset = Math.min(
        Math.max(startOffset + delta, 0),
        cardHeight - PEEK,
      );
      setCollapsed(finalOffset > (cardHeight - PEEK) / 2);
    }
  };
  dragZone.addEventListener("pointerup", endDrag);
  dragZone.addEventListener("pointercancel", endDrag);
}

/* Cycles the hero title's closing word through the audiences the studio
 * serves; the "for the" ahead of it and the full stop after it stay put.
 *
 * The word lives in a horizontally clipped box (.hero-rotator__mask) whose
 * width springs to the next word's measured width, so a longer word is
 * unveiled left to right and a shorter one has its box close in on it. The
 * word crossfades under that clip rather than being cut, and the exchange
 * happens at the bottom of the fade, while the box is already moving.
 *
 * The spring and the fade are both CSS transitions, so the browser runs them
 * off the main thread and stops them outright in a background tab.
 *
 * The rotator is aria-hidden and the first word is duplicated in a
 * visually-hidden span, so assistive tech reads one stable heading. */
const heroRotator = document.querySelector("#hero-rotator");
if (heroRotator) {
  const HERO_WORDS = {
    en: [
      "galleries",
      "artists",
      "art advisors",
      "art foundations",
      "the art world",
    ],
    fr: [
      "les galeries",
      "les artistes",
      "les art advisors",
      "les fondations",
      "le monde de l\u2019art",
    ],
  };
  const words = HERO_WORDS[LANG];
  const mask = heroRotator.querySelector(".hero-rotator__mask");
  const measure = heroRotator.querySelector(".hero-rotator__measure");
  const word = heroRotator.querySelector(".hero-rotator__word");
  const FADE_OUT_MS = 160;
  const SPRING_MS = 620;

  /* Width of a word at the heading's current (fluid) font size. */
  const widthOf = (text) => {
    measure.textContent = text;
    return measure.getBoundingClientRect().width;
  };

  if (
    mask &&
    measure &&
    word &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const heading = heroRotator.closest("h1");
    const content = heading?.closest(".hero__content");
    const firstLine = heading?.firstChild?.textContent.trim();
    const prefix = heading?.querySelector("br")?.nextSibling?.textContent.trim();

    /* Fit the longest complete line before locking the two authored lines.
     * Measuring every word avoids a wrap midway through the width spring. */
    const fitHeading = () => {
      if (!heading || !content || !firstLine || !prefix) return;
      heading.style.fontSize = "";
      const baseSize = parseFloat(getComputedStyle(heading).fontSize);
      const widestLine = Math.max(
        widthOf(firstLine),
        ...words.map((entry) => widthOf(`${prefix} ${entry}.`)),
      );
      const available = content.clientWidth - 8;
      if (available > 0 && widestLine > available) {
        heading.style.fontSize = `${(baseSize * available) / widestLine}px`;
      }
      heading.classList.add("hero-title--fixed-lines");
    };

    fitHeading();
    let index = 0;
    let swapTimer;
    let fadeTimer;
    /* The box's target width, tracked here rather than read back from the
     * DOM: a mid-transition measurement would report where the animation has
     * got to, not where it is headed, and the direction of the next move is
     * decided from it. */
    let pinned = 0;
    /* Snap, never animate: this runs on load and on resize, where a visible
     * width change would read as the heading collapsing. Any cycle in flight
     * is abandoned first, so a late webfont or a resize cannot land halfway
     * through an exchange. */
    const pin = () => {
      clearTimeout(fadeTimer);
      clearTimeout(swapTimer);
      fitHeading();
      word.textContent = words[index];
      word.classList.remove("is-swapping");
      pinned = widthOf(words[index]);
      mask.style.transition = "none";
      mask.style.width = `${pinned}px`;
      void mask.offsetWidth;
      mask.style.transition = "";
    };
    const start = () => {
      pin();
      /* fonts.ready can resolve a beat before the face is actually applied to
       * the heading — the box would then hold the fallback's wider metrics.
       * One cheap re-measure, well before the first exchange, settles it. */
      setTimeout(pin, 300);
      startCycle();
    };
    /* Wait for the webfont before starting the cycle: fallback metrics can
     * give the box a different width. Until the box holds a real length,
     * its width is "auto", which a CSS transition cannot animate from. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    function startCycle() {
      setInterval(() => {
        const next = (index + 1) % words.length;
        const target = widthOf(words[next]);
        const current = pinned;
        index = next;
        pinned = target;
        clearTimeout(fadeTimer);
        clearTimeout(swapTimer);

        /* A CSS transition needs a length at both ends: while the box is
         * still at its automatic width the move is skipped outright and the
         * exchange jumps. Stamping the current width with the transition off
         * first guarantees every move actually animates. */
        const from = (px) => {
          mask.style.transition = "none";
          mask.style.width = `${px}px`;
          void mask.offsetWidth;
          mask.style.transition = "";
        };

        const exchange = () => {
          word.textContent = words[next];
          if (target >= current) from(current);
          mask.style.width = `${target}px`;
          word.classList.remove("is-swapping");
        };

        if (target >= current) {
          // Longer: exchange under the fade, then let the widening box unveil
          // the new word from the left.
          word.classList.add("is-swapping");
          swapTimer = setTimeout(exchange, FADE_OUT_MS);
        } else {
          // Shorter: narrow first, cropping the outgoing word, and exchange
          // only once the box has arrived. Swapping up front would leave the
          // short word floating in a box that is still wide, opening a gap
          // between it and the full stop that follows.
          from(current);
          mask.style.width = `${target}px`;
          fadeTimer = setTimeout(
            () => word.classList.add("is-swapping"),
            SPRING_MS - FADE_OUT_MS,
          );
          swapTimer = setTimeout(exchange, SPRING_MS);
        }
      }, 3400);

      /* The heading's font size is fluid, so a resize changes every width. */
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(pin, 150);
      });
    }
  }
}

/* WhatsApp tool visual: scale the fixed-width chat stage to its card. */
document.querySelectorAll(".wa-mock").forEach((mock) => {
  const set = () => mock.style.setProperty("--wa-s", String(mock.clientWidth / 480));
  set();
  new ResizeObserver(set).observe(mock);
});

/* Gmail tool visual: scale the stage to its card and play the add-in sequence
 * (compose, open the side panel, search, pick a work, insert it), then loop. */
document.querySelectorAll(".product-visual--gmail").forEach((visual) => {
  const mock = visual.querySelector(".gm-mock");
  if (!mock) return;
  const bodyEl = mock.querySelector(".gm-body__text");
  const queryEl = mock.querySelector(".gm-query");
  const scroller = mock.querySelector(".gm-side__scroll");
  const results = mock.querySelector(".gm-results");
  const firstRow = mock.querySelector(".gm-row");
  const body = visual.dataset.gmBody || "";
  const word = "Elron";
  const flags = ["is-panel", "is-results", "is-inserted", "is-bump", "is-scrolled"];
  const scale = () => mock.style.setProperty("--gm-s", String(mock.clientWidth / 480));
  scale();
  new ResizeObserver(scale).observe(mock);

  let timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const stop = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  const showFinal = () => {
    bodyEl.textContent = body;
    queryEl.textContent = word;
    mock.classList.add("is-inserted", "is-scrolled");
  };

  const play = () => {
    stop();
    mock.classList.remove(...flags);
    firstRow.classList.remove("is-hit");
    bodyEl.textContent = "";
    queryEl.textContent = "";
    scroller.scrollTop = 0;

    const typeStep = 36;
    const typeEnd = 150 + body.length * typeStep;
    for (let i = 1; i <= body.length; i += 1) {
      at(150 + i * typeStep, () => (bodyEl.textContent = body.slice(0, i)));
    }
    at(typeEnd + 250, () => mock.classList.add("is-bump"));
    at(typeEnd + 840, () => mock.classList.remove("is-bump"));
    at(typeEnd + 300, () => mock.classList.add("is-panel"));

    const searchStart = typeEnd + 700;
    word.split("").forEach((_, i) => {
      at(searchStart + i * 320, () => (queryEl.textContent = word.slice(0, i + 1)));
    });
    const searchEnd = searchStart + (word.length - 1) * 320;
    at(searchEnd + 350, () => mock.classList.add("is-results"));
    at(searchEnd + 800, () => {
      scroller.scrollTop = Math.max(0, results.offsetTop - 8);
    });
    at(searchEnd + 2250, () => firstRow.classList.add("is-hit"));
    at(searchEnd + 3150, () => mock.classList.add("is-inserted"));
    at(searchEnd + 5750, () => mock.classList.add("is-scrolled"));
    at(searchEnd + 9250, play);
  };

  /* Rests on the finished frame; plays only while the card is hovered or focused. */
  showFinal();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = visual.closest(".product-card") || visual;
  const rest = () => {
    stop();
    mock.classList.remove(...flags);
    firstRow.classList.remove("is-hit");
    showFinal();
  };
  card.addEventListener("mouseenter", play);
  card.addEventListener("mouseleave", rest);
  card.addEventListener("focusin", play);
  card.addEventListener("focusout", rest);
});

/* Studio intro: split into words and reveal them (pale -> ink) as the block scrolls
 * through the viewport. Reduced motion shows everything at once. */
(() => {
  const section = document.querySelector(".studio-statement, .studio-intro");
  if (!section) return;
  const words = [];
  section.querySelectorAll("[data-reveal]").forEach((p) => {
    // Text nodes are split into words; an element marked .intro-name (name + photo)
    // is kept whole and counts as a single word.
    const nodes = [...p.childNodes];
    p.textContent = "";
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            p.append(" ");
            return;
          }
          const span = document.createElement("span");
          span.className = "rv-w";
          span.textContent = part;
          p.append(span);
          words.push(span);
        });
      } else {
        node.classList.add("rv-w");
        p.append(node);
        words.push(node);
      }
    });
  });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const update = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 55%.
    const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.3)));
    const n = words.length;
    words.forEach((w, i) => {
      const a = Math.min(1, Math.max(0, p * (n + 6) - i) / 3);
      w.style.setProperty("--a", a.toFixed(3));
    });
  };
  let queued = false;
  const tick = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  update();
})();

/* Tools carousel: prev / next buttons and a pagination pill (one dot per reachable
 * scroll position), centred under the cards. */
(() => {
  const track = document.querySelector(".product-cards");
  const nav = document.querySelector(".product-cards__nav");
  if (!track || !nav) return;
  const [prev, next] = nav.querySelectorAll(".product-cards__btn");
  const dotsEl = nav.querySelector(".product-cards__dots");
  const pageLabel = nav.dataset.pageLabel || "Page";
  const step = () => {
    const card = track.querySelector(".product-card");
    return card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
  };
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const positions = () => {
    const n = Math.max(1, Math.ceil(maxScroll() / step() - 0.05) + 1);
    return Array.from({ length: n }, (_, i) => Math.min(i * step(), maxScroll()));
  };
  const buildDots = () => {
    const pos = positions();
    if (dotsEl.children.length === pos.length) return;
    dotsEl.innerHTML = "";
    pos.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "product-cards__dot";
      dot.dataset.page = String(i);
      dot.setAttribute("aria-label", `${pageLabel} ${i + 1}`);
      dotsEl.append(dot);
    });
  };
  const sync = () => {
    buildDots();
    const pos = positions();
    let active = 0;
    pos.forEach((p, i) => {
      if (Math.abs(track.scrollLeft - p) < Math.abs(track.scrollLeft - pos[active])) active = i;
    });
    [...dotsEl.children].forEach((d, i) => d.classList.toggle("is-active", i === active));
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll() - 2;
  };
  nav.addEventListener("click", (event) => {
    const btn = event.target.closest(".product-cards__btn");
    const dot = event.target.closest(".product-cards__dot");
    if (btn) {
      track.scrollBy({ left: Number(btn.dataset.dir) * step(), behavior: "smooth" });
    } else if (dot) {
      track.scrollTo({ left: positions()[Number(dot.dataset.page)], behavior: "smooth" });
    }
  });
  track.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  sync();
})();

/* Artwork record visual: scale its fixed-width stage to the card. */
document.querySelectorAll(".aw-mock").forEach((mock) => {
  const set = () => mock.style.setProperty("--aw-s", String(mock.clientWidth / 520));
  set();
  new ResizeObserver(set).observe(mock);
});

/* Morning brief visual: scale its stage; rests on the answer, and on hover types the
 * question into the composer, then sends it and shows the answer. */
document.querySelectorAll(".product-visual--crm").forEach((visual) => {
  const mock = visual.querySelector(".mb-mock");
  if (!mock) return;
  const scale = () => mock.style.setProperty("--mb-s", String(mock.clientWidth / 480));
  scale();
  new ResizeObserver(scale).observe(mock);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const textEl = mock.querySelector(".mb-text");
  const question = visual.dataset.mbQ || "";
  let timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const stop = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const rest = () => {
    stop();
    mock.classList.remove("is-typing", "is-composing");
    textEl.textContent = "";
  };
  const play = () => {
    stop();
    textEl.textContent = "";
    mock.classList.remove("is-typing");
    mock.classList.add("is-composing");
    const step = 42;
    const start = 650;
    mock.classList.add("is-typing");
    for (let i = 1; i <= question.length; i += 1) {
      at(start + i * step, () => (textEl.textContent = question.slice(0, i)));
    }
    const done = start + question.length * step;
    // Sent: the composer empties and the answer comes in.
    at(done + 600, () => {
      mock.classList.remove("is-composing");
      mock.classList.remove("is-typing");
      textEl.textContent = "";
    });
    at(done + 6200, play);
  };
  const card = visual.closest(".product-card") || visual;
  card.addEventListener("mouseenter", play);
  card.addEventListener("mouseleave", rest);
  card.addEventListener("focusin", play);
  card.addEventListener("focusout", rest);
});
