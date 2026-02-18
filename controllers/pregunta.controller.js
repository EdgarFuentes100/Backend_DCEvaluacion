const Pregunta = require('../models/pregunta.model');

async function listarPorPrueba(req, res, next) {
  try {
    const { idPrueba } = req.params;

    const preguntas = await Pregunta.obtenerPreguntasPorPrueba(idPrueba);

    res.json({
      ok: true,
      total: preguntas.length,
      datos: preguntas
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarPorPrueba
};
