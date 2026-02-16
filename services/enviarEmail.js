const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Enviar email con adjuntos opcionales
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {Array<{ filename: string, content: Buffer }>} archivos
 */
async function enviarEmail({ to, subject, text, archivos = [] }) {
  console.log("📤 Enviando email con Resend...");

  const response = await resend.emails.send({
    from: "onboarding@resend.dev", // temporal
    to,
    subject,
    text,
    attachments: archivos.length
      ? archivos.map(file => ({
          filename: file.filename,
          content: file.content.toString("base64")
        }))
      : undefined
  });

  console.log("✅ Email enviado:", response);
  return response;
}

module.exports = { enviarEmail };
