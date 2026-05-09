const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validatePayload(body) {
  const { name, email, subject, message } = body;
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100)
    return "Name must be between 2 and 100 characters.";
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 254)
    return "Invalid email address.";
  if (!subject || typeof subject !== "string" || subject.trim().length < 3 || subject.trim().length > 200)
    return "Subject must be between 3 and 200 characters.";
  if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5000)
    return "Message must be between 10 and 5000 characters.";
  return null;
}

export async function onRequestPost({ request, env }) {
  // CSRF: only accept requests from the production origin
  const origin = request.headers.get("Origin");
  const allowedOrigin = "https://echopointmx.com";
  if (!origin || origin !== allowedOrigin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting per IP
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field; legitimate users never see it
  if (body.website) {
    return Response.json({ success: true });
  }

  const validationError = validatePayload(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const subject = body.subject.trim();
  const message = body.message.trim();

  let res;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@echopoint-intsolutions.com",
        to: "contacto@echopointmx.com",
        reply_to: email,
        subject: `[Web Contact] ${escapeHtml(subject)}`,
        html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
               <p><strong>Email:</strong> ${escapeHtml(email)}</p>
               <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
               <p><strong>Mensaje:</strong></p>
               <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return Response.json({ error: "Failed to reach email service." }, { status: 500 });
  }

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Resend API error:", res.status, errorBody);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  return Response.json({ success: true, message: "Form submitted successfully." });
}
