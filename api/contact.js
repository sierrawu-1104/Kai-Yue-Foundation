const { Resend } = require("resend");

/* Only these origins may call this function. */
const ALLOWED_ORIGINS = [
  "https://kaiyuefoundation.org",
  "https://www.kaiyuefoundation.org",
  "https://kyfoundation.org",
  "https://www.kyfoundation.org",
  "https://sierrawu-1104.github.io",
  "https://kai-yue-foundation.vercel.app",
  "http://localhost:8934",
];

function corsHeaders(origin) {
  var headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

module.exports = {
  async fetch(request) {
    var origin = request.headers.get("origin") || "";
    var headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: headers });
    }

    if (request.method !== "POST") {
      return Response.json(
        { success: false, message: "Method not allowed" },
        { status: 405, headers: headers }
      );
    }

    try {
      var formData = await request.formData();

      /* Honeypot: a real visitor never sees or fills this field, so any
         value here means a bot filled every input it could find. Accept
         silently rather than error, so the bot gets no signal to adapt to. */
      if (formData.get("_honey")) {
        return Response.json({ success: true }, { headers: headers });
      }

      var name = (formData.get("name") || "").toString().trim();
      var email = (formData.get("email") || "").toString().trim();
      var message = (formData.get("message") || "").toString().trim();
      var topic = (formData.get("topic") || "General Inquiry").toString();

      if (!name || !email || !message) {
        return Response.json(
          { success: false, code: "missing_fields", message: "Missing required fields" },
          { status: 400, headers: headers }
        );
      }

      /* The form input's type="email" only checks for an "@" with a
         character on each side - it happily lets through something like
         "name@host" with no TLD. Resend's `reply_to` validation is
         stricter (it wants a real name@domain.tld shape) and rejects that
         at send time with a 422, which - since it comes back through
         result.error below rather than as a thrown exception - would
         otherwise be indistinguishable from any other send failure.
         Checking the same shape here catches it before spending a Resend
         call on a submission from a form that's already misconfigured. */
      var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!EMAIL_RE.test(email)) {
        return Response.json(
          { success: false, code: "invalid_email", message: "Please enter a valid email address" },
          { status: 400, headers: headers }
        );
      }

      var attachments = [];
      var file = formData.get("application");
      if (file && typeof file === "object" && file.size > 0) {
        var buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }

      var resend = new Resend(process.env.RESEND_API_KEY);

      var result = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: "[" + topic + "] - " + name,
        text:
          "Name: " +
          name +
          "\nEmail: " +
          email +
          "\nTopic: " +
          topic +
          "\n\n" +
          message,
        attachments: attachments,
      });

      /* The SDK resolves even on a rejected send (bad from-domain, invalid
         recipient, etc.) rather than throwing - it reports that through
         result.error instead, so this has to be checked explicitly or a
         failed send would still report success: true below. */
      if (result.error) {
        console.error(result.error);
        return Response.json(
          { success: false, code: "send_failed", message: "Failed to send" },
          { status: 500, headers: headers }
        );
      }

      /* buffer/attachments go out of scope here and are garbage collected —
         nothing is ever written to disk or any persistent store. */
      return Response.json({ success: true }, { headers: headers });
    } catch (err) {
      console.error(err);
      return Response.json(
        { success: false, code: "send_failed", message: "Failed to send" },
        { status: 500, headers: headers }
      );
    }
  },
};
