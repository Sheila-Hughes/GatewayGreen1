const limits = { firstName: 100, lastName: 100, email: 254, phone: 50, message: 3000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const success = { message: "Thank you. Your enquiry was sent." };

module.exports = async function contact(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Use the contact form to send an enquiry." });
  }
  const body = request.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return response.status(400).json({ message: "Please fill in the contact form." });
  }
  if (body.website) return response.status(200).json(success);

  const fields = {};
  for (const [name, limit] of Object.entries(limits)) {
    const value = body[name] ?? "";
    if (typeof value !== "string" || value.length > limit) {
      return response.status(400).json({ message: "Please check the length of your details and message." });
    }
    fields[name] = value.trim();
  }

  const { firstName, lastName, email, phone, message } = fields;
  if (!firstName || !lastName || !emailPattern.test(email) || !message) {
    return response.status(400).json({ message: "Please enter your name, a valid email and a message." });
  }

  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    return response.status(503).json({ message: "Enquiries are temporarily unavailable. Please try again later." });
  }

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: "Gateway Green website enquiry",
        text: ["Name: " + firstName + " " + lastName, "Email: " + email, "Phone: " + phone, "", message].join("\n")
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (delivery.ok) return response.status(200).json(success);
  } catch {
    return response.status(502).json({ message: "We couldn’t send your enquiry. Please try again later." });
  }
  return response.status(502).json({ message: "We couldn’t send your enquiry. Please try again later." });
};
