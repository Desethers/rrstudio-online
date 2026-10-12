import "./styles/showcase.css";

/* name = value of ?component= on the site; w x h = the size the component is previewed at. */
const COMPONENTS = [
  { name: "hero", title: "Hero", note: "Title, invoice, sub-copy, buttons", w: 1440, h: 640 },
  { name: "studio", title: "Studio card", note: "Expandable intro card", w: 1440, h: 640 },
  { name: "tools", title: "Tools", note: "Gmail, WhatsApp and CRM cards", w: 1440, h: 960 },
  { name: "workshop", title: "Workshop", note: "AI workshop card", w: 1440, h: 640 },
  { name: "quote", title: "Quote", note: "Client quote", w: 1440, h: 520 },
  { name: "faq", title: "FAQ", note: "Questions and answers", w: 1440, h: 720 },
  /* One tile per task card: ?component=task&id=<task id>. */
  { name: "task", id: "publish-exhibition", title: "Publish an exhibition", note: "Task card · Website", w: 900, h: 600 },
  { name: "task", id: "opening-website", title: "Prepare for an opening", note: "Task card · Website", w: 900, h: 600 },
  { name: "task", id: "artist-page", title: "Add an artist page", note: "Task card · Website", w: 900, h: 600 },
  { name: "task", id: "update-artworks", title: "Update 10 artworks", note: "Task card · Website", w: 900, h: 600 },
  { name: "task", id: "fix-website-issue", title: "Fix a website issue", note: "Task card · Website", w: 900, h: 600 },
  { name: "task", id: "organise-database", title: "Organise your inventory", note: "Task card · Inventory", w: 900, h: 600 },
  { name: "task", id: "import-artworks", title: "Import 50 artworks", note: "Task card · Inventory", w: 900, h: 600 },
  { name: "task", id: "clean-records", title: "Clean 50 artwork records", note: "Task card · Inventory", w: 900, h: 600 },
  { name: "task", id: "artlogic-check", title: "Clean up your Artlogic inventory", note: "Task card · Inventory", w: 900, h: 600 },
  { name: "task", id: "collector-pdf", title: "Collector PDF", note: "Task card · Sales material", w: 900, h: 600 },
  { name: "task", id: "viewing-room", title: "Private viewing room", note: "Task card · Sales material", w: 900, h: 600 },
  { name: "task", id: "seo-check", title: "Artist Google indexing", note: "Task card · Visibility", w: 900, h: 600 },
];

const url = (c) => `/?component=${c.name}${c.id ? `&id=${c.id}` : ""}`;
const grid = document.getElementById("showcase-grid");

for (const c of COMPONENTS) {
  const item = document.createElement("li");
  item.innerHTML = `
    <button class="tile" type="button" data-key="${c.id || c.name}">
      <span class="tile__frame" style="--w:${c.w}; --h:${c.h}">
        <iframe src="${url(c)}" title="${c.title}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
      </span>
      <span class="tile__meta"><strong>${c.title}</strong><small>${c.note}</small></span>
    </button>`;
  grid.append(item);
}

/* Each preview is the full-size component scaled down to the tile's width. */
const fit = () =>
  document.querySelectorAll(".tile__frame").forEach((frame) => {
    const w = Number(frame.style.getPropertyValue("--w"));
    frame.style.setProperty("--scale", String(frame.clientWidth / w));
  });
new ResizeObserver(fit).observe(grid);
fit();

let modal = null;
const close = () => {
  if (!modal) return;
  modal.remove();
  modal = null;
  document.documentElement.style.overflow = "";
};
const open = (c) => {
  close();
  modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", c.title);
  modal.innerHTML = `
    <div class="modal__sheet">
      <div class="modal__bar">
        <span>${c.title} <small>${url(c)}</small></span>
        <span class="modal__actions">
          <a href="${url(c)}" target="_blank" rel="noopener">Open alone ↗</a>
          <button type="button" class="modal__close" aria-label="Close">×</button>
        </span>
      </div>
      <iframe src="${url(c)}" title="${c.title}"></iframe>
    </div>`;
  document.body.append(modal);
  document.documentElement.style.overflow = "hidden";
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".modal__close")) close();
  });
  modal.querySelector(".modal__close").focus();
};

grid.addEventListener("click", (event) => {
  const tile = event.target.closest(".tile");
  if (!tile) return;
  open(COMPONENTS.find((c) => (c.id || c.name) === tile.dataset.key));
});
addEventListener("keydown", (event) => {
  if (event.key === "Escape") close();
});
