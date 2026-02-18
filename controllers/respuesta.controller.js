const Respuesta = require("../models/respuesta.model");


// 🔹 Listar respuestas de un intento
async function listarPorIntento(req, res, next) {
  try {
    const { idIntento } = req.params;

    const respuestas = await Respuesta.obtenerRespuestasPorIntento(idIntento);

    res.json({
      ok: true,
      datos: respuestas
    });

  } catch (error) {
    next(error);
  }
}


// 🔹 Guardar respuesta
async function guardar(req, res, next) {
  try {
    const { idIntento, idPregunta, valor, textoRespuesta } = req.body;

    await Respuesta.guardarRespuesta(
      idIntento,
      idPregunta,
      valor,
      textoRespuesta
    );

    res.json({ ok: true });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarPorIntento,
  guardar
};
