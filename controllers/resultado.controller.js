const Resultados = require('../models/resultado.model');

// 🔎 Listar resultados
async function listar(req, res, next) {
  try {
    const datos = await Resultados.getResultados();
    res.json({ ok: true, datos });
  } catch (err) { 
    next(err); 
  }
}


// ✏ Actualizar resultado
async function actualizar(req, res, next) {
  try {
    await Resultados.actualizarResultado(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) { 
    next(err); 
  }
}

async function actualizarPrueba3(req, res, next) {
  try {
    await Resultados.actualizarPrueba3(req.params.id);
    res.json({ ok: true });
  } catch (err) { 
    next(err); 
  }
}

async function actualizarPrueba1(req, res, next) {
  try {
    await Resultados.actualizarPrueba1(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) { 
    next(err); 
  }
}

module.exports = {
  listar,
  actualizar,
  actualizarPrueba3,
  actualizarPrueba1
};