const habilidad = require('../models/habilidadCategoria.model');

// 🔎 GET: Listar resultados por usuario
async function detalles(req, res, next) {
  try {
    const idUsuario = req.params.id; // ✅ obtener id desde la URL
    if (!idUsuario) {
      return res.status(400).json({ ok: false, msg: 'Se requiere idUsuario' });
    }

    const datos = await habilidad.getResultados(idUsuario);

    res.json({
      ok: true,
      datos
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  detalles
};