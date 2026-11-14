// Phone menu: the burger in the header opens a full-screen list of the main pages.
const burger = document.querySelector(".burger");
const menu = document.querySelector("#mobile-menu");
if (burger && menu) {
  const root = document.documentElement;
  menu.inert = true;
  const set = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("is-open", open);
    menu.inert = !open;
    burger.classList.toggle("is-open", open);
    root.classList.toggle("menu-open", open);
    if (open) {
      window.scrollTo(0, 0);
      menu.querySelector("a")?.focus({ preventScroll: true });
    }
  };
  burger.addEventListener("click", () => set(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) set(false);
  });
  document.addEventListener("keydown", (event) => {
    if (burger.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") { set(false); burger.focus(); }
    if (event.key === "Tab") {
      const focusable = [burger, ...menu.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia("(min-width: 641px)").addEventListener("change", (event) => {
    if (event.matches) set(false);
  });
}
