// services/enviarEmail.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Enviar email con adjuntos
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {Array} archivos - [{ filename, content }]
 */
async function enviarEmail({ to, subject, text, archivos }) {
  console.log("📤 Enviando email con Resend...");

  const response = await resend.emails.send({
    from: "onboarding@resend.dev", // temporal
    to,
    subject,
    text,
    attachments: archivos?.map(file => ({
      filename: file.filename,
      content: file.content.toString("base64")
    }))
  });

  console.log("✅ Email enviado:", response);
  return response;
}

module.exports = { enviarEmail };
