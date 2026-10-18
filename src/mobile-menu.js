// Phone menu: the burger in the header opens a full-screen list of the main pages.
const burger = document.querySelector(".burger");
const menu = document.querySelector("#mobile-menu");
if (burger && menu) {
  const root = document.documentElement;
  const set = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    root.classList.toggle("menu-open", open);
    if (open) window.scrollTo(0, 0);
  };
  burger.addEventListener("click", () => set(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) set(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") set(false);
  });
  window.matchMedia("(min-width: 641px)").addEventListener("change", (event) => {
    if (event.matches) set(false);
  });
}
