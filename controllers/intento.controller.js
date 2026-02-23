const Intento = require('../models/intento.model');

async function iniciarIntento(req, res, next) {
  try {
    const { idUsuario, idPrueba } = req.body;

    // 1️⃣ Verificar intento activo
    const intentoActivo = await Intento.obtenerIntentoActivo(idUsuario, idPrueba);

    if (intentoActivo) {
      return res.json({
        ok: true,
        reutilizado: true,
        idIntento: intentoActivo.idIntento
      });
    }

    // 2️⃣ Contar intentos
    const totalIntentos = await Intento.contarIntentos(idUsuario, idPrueba);

    if (totalIntentos >= 2) {
      return res.status(400).json({
        ok: false,
        msg: "Ya alcanzaste el máximo de intentos permitidos."
      });
    }

    // 3️⃣ Crear nuevo intento
    const nuevoId = await Intento.crearIntento(idUsuario, idPrueba);

    return res.status(201).json({
      ok: true,
      reutilizado: false,
      idIntento: nuevoId
    });

  } catch (error) {
    next(error);
  }
}

async function finalizarIntento(req, res, next) {
  try {
    const { idIntento } = req.params;

    await Intento.finalizarIntento(idIntento);

    res.json({ ok: true });

  } catch (error) {
    next(error);
  }
}

async function borrar(req, res, next) {
  try {
    await Intento.borrar();

    res.json({ ok: true });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  iniciarIntento,
  finalizarIntento,
  borrar
};
