export async function onRequestPost({ request, env }) {
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

  const { name, email, subject, message, website } = body;

  if (website) {
    return Response.json({ success: true });
  }

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields required." }, { status: 400 });
  }

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
        subject: `[Web Contact] ${subject}`,
        html: `<p><strong>Nombre:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Asunto:</strong> ${subject}</p>
               <p><strong>Mensaje:</strong></p>
               <p>${message}</p>`,
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
