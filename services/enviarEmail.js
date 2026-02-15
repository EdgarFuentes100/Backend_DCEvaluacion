// services/enviarEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'edgarfuentes139@gmail.com',
    pass: 'nmkt wotz rkxs panf'
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
