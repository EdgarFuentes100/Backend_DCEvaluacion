const Usuarios = require('../models/usuarios.model');

async function listar(req, res, next) {
  try {
    const datos = await Usuarios.getUsuarios();
    res.json({ ok: true, datos });
  } catch (err) { next(err); }
}

async function crear(req, res, next) {
  try {
    const nuevo = await Usuarios.crearUsuario(req.body);
    res.status(201).json({ ok: true, datos: nuevo });
  } catch (err) { next(err); }
}

async function actualizar(req, res, next) {
  try {
    await Usuarios.actualizarUsuario(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
}

async function eliminar(req, res, next) {
  try {
    await Usuarios.eliminarUsuario(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
}

module.exports = {
  listar,
  crear,
  actualizar,
  eliminar
};
