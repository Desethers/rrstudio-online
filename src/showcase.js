import "./styles/showcase.css";

/* name = value of ?component= on the site; w x h = the size the component is previewed at. */
const COMPONENTS = [
  { name: "hero", title: "Hero", note: "Title, invoice, sub-copy, buttons", w: 1440, h: 640 },
  { name: "studio", title: "Studio card", note: "Expandable intro card", w: 1440, h: 640 },
  { name: "tools", title: "Tools", note: "Gmail, WhatsApp and CRM cards", w: 1440, h: 960 },
  { name: "tasks", title: "Task cards", note: "Glyph hover and card expansion", w: 1440, h: 800 },
  { name: "workshop", title: "Workshop", note: "AI workshop card", w: 1440, h: 640 },
  { name: "quote", title: "Quote", note: "Client quote", w: 1440, h: 520 },
  { name: "faq", title: "FAQ", note: "Questions and answers", w: 1440, h: 720 },
];

const url = (name) => `/?component=${name}`;
const grid = document.getElementById("showcase-grid");

for (const c of COMPONENTS) {
  const item = document.createElement("li");
  item.innerHTML = `
    <button class="tile" type="button" data-name="${c.name}">
      <span class="tile__frame" style="--w:${c.w}; --h:${c.h}">
        <iframe src="${url(c.name)}" title="${c.title}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
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
        <span>${c.title} <small>${url(c.name)}</small></span>
        <span class="modal__actions">
          <a href="${url(c.name)}" target="_blank" rel="noopener">Open alone ↗</a>
          <button type="button" class="modal__close" aria-label="Close">×</button>
        </span>
      </div>
      <iframe src="${url(c.name)}" title="${c.title}"></iframe>
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
  open(COMPONENTS.find((c) => c.name === tile.dataset.name));
});
addEventListener("keydown", (event) => {
  if (event.key === "Escape") close();
});
