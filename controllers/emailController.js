const { enviarEmail } = require("../services/enviarEmail");

async function enviarEmailController(req, res) {
  try {
    console.log("📩 === Entró al enviarEmailController ===");

    const { destinatario, asunto, mensaje = "" } = req.body;

    console.log("📦 Body recibido:", req.body);

    if (!destinatario || !asunto) {
      console.log("❌ Faltan datos obligatorios");
      return res.status(400).json({
        ok: false,
        mensaje: "Faltan datos: destinatario y asunto son obligatorios"
      });
    }

    // ===== Preparar archivos opcionales =====
    const archivos = [];

    // Fotos (opcional)
    if (req.files?.fotos?.length) {
      console.log(`📁 Fotos recibidas: ${req.files.fotos.length}`);
      req.files.fotos.forEach((foto, idx) => {
        archivos.push({
          filename: foto.originalname,
          content: foto.buffer
        });
      });
    }

    // Excel (opcional)
    if (req.files?.excel?.[0]) {
      console.log("📊 Excel recibido:", req.files.excel[0].originalname);
      archivos.push({
        filename: req.files.excel[0].originalname,
        content: req.files.excel[0].buffer
      });
    }

    console.log("📎 Total archivos a enviar:", archivos.length);
    console.log("🚀 Enviando correo a:", destinatario);

    const info = await enviarEmail({ 
      to: destinatario,
      subject: asunto,
      text: mensaje,
      archivos
    });

    console.log("✅ Correo enviado correctamente");
    res.json({ ok: true, info });

  } catch (error) {
    console.error("🔥 Error enviando email:", error);
    res.status(500).json({ ok: false, mensaje: error.message });
  }
}

module.exports = { enviarEmailController };
