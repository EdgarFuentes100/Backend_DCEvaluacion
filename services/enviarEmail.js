// services/enviarEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // tu correo Gmail
    pass: process.env.GMAIL_APP_PASS    // contraseña de app (no tu contraseña normal)
  }
});

/**
 * Enviar email con adjuntos
 * @param {string} to - destinatario
 * @param {string} subject - asunto
 * @param {string} text - mensaje
 * @param {Array} archivos - [{ filename, content }]
 */
async function enviarEmail({ to, subject, text, archivos }) {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    attachments: archivos
  });

  console.log("Correo enviado:", info.messageId);
  return info;
}

module.exports = { enviarEmail };
