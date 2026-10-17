// POST /api/contact: sends a contact / "Let's talk" request to the studio by email
// through Resend (https://resend.com), as a plain, designed email with the visitor's
// address as reply-to. Runs as a Vercel serverless function.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY  required. A Resend API key with "Sending access".
//   CONTACT_TO      optional. Where requests go. Default: studio@rrstudio.online
//   CONTACT_FROM    optional. Sender, on a domain verified in Resend.
//                   Default: R.R Studio <contact@rrstudio.online>

const TO = process.env.CONTACT_TO || "studio@rrstudio.online";
const FROM = process.env.CONTACT_FROM || "R.R Studio <contact@rrstudio.online>";

const LABELS = {
  en: {
    heading: "New request",
    intro: "Someone wrote from the website. Reply to this email to answer them directly.",
    fields: { interest: "Interested in", name: "Name", email: "Email", gallery: "Gallery", website: "Website", message: "Message" },
    source: { contact: "Contact page", dialog: "“Let’s talk” on a tool card" },
    footer: "Sent from rrstudio.online",
    reply: "Reply",
  },
  fr: {
    heading: "Nouvelle demande",
    intro: "Quelqu’un a écrit depuis le site. Répondez à cet e-mail pour lui répondre directement.",
    fields: { interest: "Ce qui l’intéresse", name: "Nom", email: "E-mail", gallery: "Galerie", website: "Site web", message: "Message" },
    source: { contact: "Page Contact", dialog: "« En parler » sur une carte d’outil" },
    footer: "Envoyé depuis rrstudio.online",
    reply: "Répondre",
  },
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** One line of text, trimmed and capped (no line breaks: safe for subjects and names). */
const line = (value, max = 200) =>
  String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

/** Multi-line text, trimmed and capped. */
const text = (value, max = 5000) => String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, max);

const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function render(data, lang) {
  const t = LABELS[lang];
  const rows = [
    ["interest", data.interest],
    ["name", data.name],
    ["email", data.email],
    ["gallery", data.gallery],
    ["website", data.website],
    ["message", data.message],
  ].filter(([, value]) => value);

  const html = `<!doctype html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background:#f5f5f3;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;">
          <tr><td style="padding:36px 36px 8px;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
            <p style="margin:0 0 28px;font-size:15px;letter-spacing:-0.3px;color:#111110;">R.R <span style="color:#a3a3a3;">Studio</span></p>
            <h1 style="margin:0 0 10px;font-size:26px;font-weight:400;letter-spacing:-0.02em;line-height:1.15;color:#111110;">${escapeHtml(t.heading)}</h1>
            <p style="margin:0;font-size:14px;line-height:1.55;color:#7a7a76;">${escapeHtml(t.intro)}</p>
          </td></tr>
          <tr><td style="padding:20px 36px 8px;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows
  .map(
    ([key, value]) => `              <tr><td style="padding:14px 0;border-top:1px solid #efefeb;">
                <p style="margin:0 0 4px;font-size:12px;color:#a3a3a3;">${escapeHtml(t.fields[key])}</p>
                <p style="margin:0;font-size:15px;line-height:1.55;color:#111110;white-space:pre-wrap;">${
                  key === "email"
                    ? `<a href="mailto:${escapeHtml(value)}" style="color:#111110;">${escapeHtml(value)}</a>`
                    : escapeHtml(value)
                }</p>
              </td></tr>`,
  )
  .join("\n")}
            </table>
          </td></tr>
          <tr><td style="padding:12px 36px 36px;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
            <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent("Re: " + data.subject)}" style="display:inline-block;background:#111110;color:#ffffff;text-decoration:none;font-size:14px;padding:12px 22px;border-radius:999px;">${escapeHtml(t.reply)}</a>
            <p style="margin:24px 0 0;font-size:12px;color:#a3a3a3;">${escapeHtml(t.source[data.source])} · ${escapeHtml(t.footer)}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const plain = [
    t.heading,
    "",
    ...rows.map(([key, value]) => `${t.fields[key]}: ${value}`),
    "",
    `${t.source[data.source]} · ${t.footer}`,
  ].join("\n");

  return { html, plain };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ ok: false, error: "invalid_body" });

  // Honeypot: a hidden field real visitors never fill. Pretend it worked.
  if (body.hp) return res.status(200).json({ ok: true });

  const lang = body.language === "fr" ? "fr" : "en";
  const interest = Array.isArray(body.interest || body.tools)
    ? (body.interest || body.tools).map((v) => line(v, 60)).filter(Boolean).join(", ")
    : line(body.interest || body.tools, 200);
  const data = {
    interest,
    name: line(body.name, 120),
    email: line(body.email, 200),
    gallery: line(body.gallery, 160),
    website: line(body.website, 200),
    message: text(body.message),
    source: body.source === "contact page" ? "contact" : "dialog",
  };

  if (!EMAIL.test(data.email)) return res.status(400).json({ ok: false, error: "invalid_email" });
  if (!data.gallery) return res.status(400).json({ ok: false, error: "missing_gallery" });
  if (!data.message && !data.interest) return res.status(400).json({ ok: false, error: "missing_content" });

  data.subject = line(body._subject, 150) || `${lang === "fr" ? "Demande" : "Request"} — ${data.gallery}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ ok: false, error: "not_configured" });

  const { html, plain } = render(data, lang);
  let response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject: data.subject,
        html,
        text: plain,
      }),
    });
  } catch {
    return res.status(502).json({ ok: false, error: "send_failed" });
  }
  if (!response.ok) return res.status(502).json({ ok: false, error: "send_failed" });
  return res.status(200).json({ ok: true });
}
