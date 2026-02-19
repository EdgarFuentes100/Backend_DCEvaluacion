const Respuesta = require("../models/respuesta.model");


// 🔹 Listar respuestas de un intento
async function listarPorIntento(req, res, next) {
  try {
    const { idIntento } = req.params;

    const respuestas = await Respuesta.obtenerPorIntento(idIntento);

    res.json({
      ok: true,
      datos: respuestas
    });

  } catch (error) {
    next(error);
  }
}


// 🔹 Guardar o actualizar respuesta (UPSERT)
async function guardar(req, res, next) {
  try {
    const { idIntento, idPregunta, respuesta } = req.body;

    if (!idIntento || !idPregunta || respuesta === undefined) {
      return res.status(400).json({
        ok: false,
        msg: "Datos incompletos"
      });
    }

    await Respuesta.guardar(idIntento, idPregunta, respuesta);

    res.json({
      ok: true,
      msg: "Respuesta guardada correctamente"
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarPorIntento,
  guardar
};
