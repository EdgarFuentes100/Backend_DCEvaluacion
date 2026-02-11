// controllers/emailController.js
const { enviarEmail } = require("../services/enviarEmail");

async function enviarEmailController(req, res) {
  try {
    const { destinatario, asunto, mensaje } = req.body;

    if (!destinatario || !asunto) {
      return res.status(400).json({
        ok: false,
        mensaje: "Faltan datos: destinatario y asunto son obligatorios"
      });
    }

    // Preparar archivos adjuntos
    const archivos = [];
    if (req.files.fotos) {
      req.files.fotos.forEach(foto => {
        archivos.push({
          filename: foto.originalname,
          content: foto.buffer
        });
      });
    }

    if (req.files.excel && req.files.excel[0]) {
      archivos.push({
        filename: req.files.excel[0].originalname,
        content: req.files.excel[0].buffer
      });
    }

    // Enviar correo
    const info = await enviarEmail({ 
      to: destinatario, 
      subject: asunto, 
      text: mensaje || "", 
      archivos 
    });

    res.json({ ok: true, info });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ ok: false, mensaje: error.message });
  }
}

module.exports = { enviarEmailController };
