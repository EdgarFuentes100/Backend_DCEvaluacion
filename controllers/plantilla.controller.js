const plantilla = require('../models/plantilla.model');

async function listar(req, res, next) {
  try {
    const datos = await plantilla.getPlantilla();
    res.json({
      ok: true,
      message: 'Lista de pacientes obtenida',
      datos   // Usar siempre "datos"
    });
  } catch (err) { next(err); }
}


module.exports = {
  listar
};

