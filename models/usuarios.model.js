const { localDB } = require('../config/db');

async function getUsuarios() {
  const [rows] = await localDB.query(`
    
    SELECT 
      u.idUsuario,
      u.activo,
      r.idRol,
      r.rol,
      u.pinCode,
      p.idPersona,
      p.nombreCompleto,
      p.dui,
      u.pinCreadoEn,
      u.duracionPinMin
    FROM usuario u
    JOIN persona p ON u.idPersona = p.idPersona
    JOIN rol r ON u.idRol = r.idRol
  `);
  return rows;
}

async function crearUsuario(data) {
  const {
    nombreCompleto,
    dui,
    idRol,
    pinCode,
    duracionPinMin
  } = data;

  const conn = await localDB.getConnection();

  try {
    await conn.beginTransaction();

    // 1. crear persona
    const [persona] = await conn.query(`
      INSERT INTO persona (nombreCompleto, dui)
      VALUES (?, ?)
    `, [nombreCompleto, dui]);

    // 2. crear usuario
    const [usuario] = await conn.query(`
      INSERT INTO usuario (
        idPersona, idRol, pinCode, duracionPinMin, pinCreadoEn, activo
      )
      VALUES (?, ?, ?, ?, NOW(), 1)
    `, [
      persona.insertId,
      idRol,
      pinCode,
      duracionPinMin
    ]);

    await conn.commit();

    return {
      idUsuario: usuario.insertId,
      idPersona: persona.insertId
    };

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

async function actualizarUsuario(idUsuario, data) {
  const {
    nombreCompleto,
    dui,
    idRol,
    activo
  } = data;

  const conn = await localDB.getConnection();

  try {
    await conn.beginTransaction();

    const [[usuario]] = await conn.query(
      'SELECT idPersona FROM usuario WHERE idUsuario = ?',
      [idUsuario]
    );

    if (!usuario) throw new Error('Usuario no existe');

    // actualizar persona
    await conn.query(`
      UPDATE persona
      SET nombreCompleto=?, dui=?
      WHERE idPersona=?
    `, [nombreCompleto, dui, usuario.idPersona]);

    // actualizar usuario
    await conn.query(`
      UPDATE usuario
      SET idRol=?, activo=?
      WHERE idUsuario=?
    `, [idRol, activo, idUsuario]);

    await conn.commit();
    return getUsuarioById(idUsuario);

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function eliminarUsuario(idUsuario) {
  const conn = await localDB.getConnection();

  try {
    await conn.beginTransaction();

    const [[usuario]] = await conn.query(
      'SELECT idPersona FROM usuario WHERE idUsuario = ?',
      [idUsuario]
    );

    if (!usuario) throw new Error('Usuario no existe');

    await conn.query('DELETE FROM usuario WHERE idUsuario=?', [idUsuario]);
    await conn.query('DELETE FROM persona WHERE idPersona=?', [usuario.idPersona]);

    await conn.commit();
    return true;

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
