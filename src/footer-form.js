// Email-only forms (site footer, Gallery AI Starter card): leave an email address and the studio
// gets an email (POST /api/contact, source from data-source, "footer" by default). No account,
// no list: the address only lands in the studio's inbox.
import { ACCESS_ENDPOINT } from "./endpoint.js";

document.querySelectorAll(".big-footer__form, .workshop-offer__form").forEach((form) => {
  const status = form.querySelector('[role="status"]');
  const field = form.querySelector('input[name="email"]');
  const button = form.querySelector('button[type="submit"]');
  const lang = form.dataset.lang;
  const msgs = JSON.parse(form.dataset.msgs);
  const note = status.textContent;

  const say = (text, state) => {
    status.textContent = text;
    form.dataset.state = state || "";
  };
  field.addEventListener("input", () => {
    if (form.dataset.state === "error") say(note, "");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = field.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      say(msgs.invalid, "error");
      field.focus();
      return;
    }
    button.disabled = true;
    try {
      const response = await fetch(ACCESS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, language: lang, source: form.dataset.source || "footer", hp: form.hp.value }),
      });
      if (!response.ok) throw new Error(response.status);
    } catch {
      button.disabled = false;
      say(msgs.failed, "error");
      return;
    }
    field.value = "";
    button.disabled = false;
    say(msgs.ok, "done");
  });
});
