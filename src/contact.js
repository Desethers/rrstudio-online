// Contact page: the category page styles, plus the contact form. The request is posted
// to ACCESS_ENDPOINT (see endpoint.js); until it is set, the form opens a prefilled email.
import "./category.js";
import "./styles/category.css";
import { ACCESS_ENDPOINT } from "./endpoint.js";

const form = document.querySelector("#contact-form");
if (form) {
  const done = document.querySelector("#contact-done");
  const error = document.querySelector("#contact-error");
  const submit = form.querySelector('button[type="submit"]');
  const lang = form.dataset.lang;
  const copy = JSON.parse(form.dataset.msgs);

  // "/contact/?interest=workshop" opens the form with that interest already ticked.
  const wanted = new URLSearchParams(window.location.search).get("interest");
  const preset = wanted && form.querySelector(`input[name="interest"][data-key="${CSS.escape(wanted)}"]`);
  if (preset) preset.checked = true;

  const showError = (message, field) => {
    error.textContent = message;
    error.hidden = false;
    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  };
  const clearError = () => {
    error.hidden = true;
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  };
  form.addEventListener("input", clearError);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const data = {
      interest: [...form.querySelectorAll('input[name="interest"]:checked')].map((box) => box.value),
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      gallery: form.gallery.value.trim(),
      website: form.website.value.trim(),
      message: form.message.value.trim(),
    };
    if (!data.name) return showError(copy.errName, form.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showError(copy.errEmail, form.email);
    if (!data.gallery) return showError(copy.errGallery, form.gallery);
    if (!data.message) return showError(copy.errMessage, form.message);

    const subject = `${copy.subject} — ${data.gallery}`;
    if (!ACCESS_ENDPOINT) {
      const [interestLabel, nameLabel, emailLabel, galleryLabel, websiteLabel] = copy.labels;
      const body = `${copy.greeting}\n\n${data.message}\n\n${nameLabel}: ${data.name}\n${emailLabel}: ${data.email}\n${galleryLabel}: ${data.gallery}\n${websiteLabel}: ${data.website || "—"}\n${interestLabel}: ${data.interest.join(", ") || "—"}`;
      window.location.href = `mailto:studio@rrstudio.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      submit.disabled = true;
      try {
        const response = await fetch(ACCESS_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            interest: data.interest.join(", "),
            _subject: subject,
            _replyto: data.email,
            language: lang,
            hp: form.hp.value,
            source: "contact page",
          }),
        });
        if (!response.ok) throw new Error(response.status);
      } catch {
        submit.disabled = false;
        return showError(copy.failed);
      }
    }
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
}
