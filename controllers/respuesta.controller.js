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
    // ✅ Ahora recibimos también peso y porcentaje del body
    const { idIntento, idPregunta, respuesta, peso, porcentaje } = req.body;

    // Validar campos obligatorios
    if (!idIntento || !idPregunta || respuesta === undefined) {
      return res.status(400).json({
        ok: false,
        msg: "Datos incompletos: faltan idIntento, idPregunta o respuesta"
      });
    }

    // ✅ Valores por defecto para peso y porcentaje (0 si no vienen)
    const pesoFinal = peso !== undefined ? peso : 0;
    const porcentajeFinal = porcentaje !== undefined ? porcentaje : 0;

    // ✅ Llamar al modelo con los 5 parámetros
    await Respuesta.guardar(
      idIntento, 
      idPregunta, 
      respuesta, 
      pesoFinal, 
      porcentajeFinal
    );

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