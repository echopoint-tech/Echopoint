import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

// In-memory rate limiter: max 5 requests per 60 s per IP
// Note: resets per serverless instance restart; sufficient for this use case
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = result.data;

  // ─── Connect your email service here ───────────────────────────────────────
  // Resend example:
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "noreply@echopointmx.com",
  //     to: "contacto@echopointmx.com",
  //     subject: `[Web Contact] ${subject}`,
  //     html: `<p><strong>Name:</strong> ${name}</p>
  //            <p><strong>Email:</strong> ${email}</p>
  //            <p><strong>Message:</strong> ${message}</p>`,
  //   });
  // ───────────────────────────────────────────────────────────────────────────

  console.log("📩 New contact form submission:", {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    { success: true, message: "Form submitted successfully." },
    { status: 200 }
  );
}
