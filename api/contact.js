const nodemailer = require("nodemailer");

/* Only these origins may call this function. Add the production domain here
   once the site moves off GitHub Pages. */
const ALLOWED_ORIGINS = [
  "https://sierrawu-1104.github.io",
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
          { success: false, message: "Missing required fields" },
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
          contentType: file.type,
        });
      }

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: "[" + topic + "] Website inquiry from " + name,
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

      /* buffer/attachments go out of scope here and are garbage collected —
         nothing is ever written to disk or any persistent store. */
      return Response.json({ success: true }, { headers: headers });
    } catch (err) {
      console.error(err);
      return Response.json(
        { success: false, message: "Failed to send" },
        { status: 500, headers: headers }
      );
    }
  },
};
