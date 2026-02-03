const Usuarios = require('../models/usuarios.model');

async function listar(req, res, next) {
  try {
    const datos = await Usuarios.getUsuarios();
    res.json({
      ok: true,
      message: 'Lista de usuarios obtenida',
      datos
    });
  } catch (err) { next(err); }
}


async function crear(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'No se recibieron datos para crear usuario',
        datos: null
      });
    }

    const nuevo = await Usuarios.crearUsuario(req.body);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente',
      datos: nuevo
    });
  } catch (err) { next(err); }
}

async function actualizar(req, res, next) {
  try {
    const actualizado = await Usuarios.actualizarUsuario(
      req.params.id,
      req.body
    );
    console.log(      req.params.id,
      req.body);

    res.json({
      ok: true,
      message: 'Usuario actualizado correctamente',
      datos: actualizado
    });
  } catch (err) { next(err); }
}

async function eliminar(req, res, next) {
  try {
    await Usuarios.eliminarUsuario(req.params.id);

    res.json({
      ok: true,
      message: 'Usuario eliminado correctamente',
      datos: null
    });
  } catch (err) { next(err); }
}

module.exports = {
  listar,
  crear,
  actualizar,
  eliminar
};
