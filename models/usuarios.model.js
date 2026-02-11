const { localDB } = require('../config/db');

async function getUsuarios() {
  const [rows] = await localDB.query(`
    SELECT 
      u.idUsuario,
      u.activo,
      u.idplantilla_excel,
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
    duracionPinMin,
    idplantilla_excel
  } = data;

  const conn = await localDB.getConnection();

  try {
    await conn.beginTransaction();

    // 1. persona
    const [persona] = await conn.query(
      `INSERT INTO persona (nombreCompleto, dui) VALUES (?, ?)`,
      [nombreCompleto, dui]
    );

    // 2. usuario (AQUÍ SE INSERTA LA PLANTILLA)
    const [usuario] = await conn.query(`
      INSERT INTO usuario (
        idPersona,
        idRol,
        idplantilla_excel,
        pinCode,
        duracionPinMin,
        pinCreadoEn,
        activo
      ) VALUES (?, ?, ?, ?, ?, NOW(), 1)
    `, [
      persona.insertId,
      idRol,
      idplantilla_excel || null,
      pinCode,
      duracionPinMin
    ]);

    await conn.commit();

    return {
      idUsuario: usuario.insertId,
      idPersona: persona.insertId
    };

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function actualizarUsuario(idUsuario, data) {
  const {
    nombreCompleto,
    dui,
    idRol,
    activo,
    duracionPinMin,
    idplantilla_excel
  } = data;

  const conn = await localDB.getConnection();

  try {
    await conn.beginTransaction();

    const [[usuario]] = await conn.query(
      `SELECT idPersona FROM usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (!usuario) throw new Error('Usuario no existe');

    // persona
    await conn.query(`
      UPDATE persona
      SET nombreCompleto=?, dui=?
      WHERE idPersona=?
    `, [nombreCompleto, dui, usuario.idPersona]);

    // usuario (SE ACTUALIZA PLANTILLA Y MINUTOS)
    await conn.query(`
      UPDATE usuario
      SET 
        idRol=?,
        activo=?,
        duracionPinMin=?,
        idplantilla_excel=?
      WHERE idUsuario=?
    `, [
      idRol,
      activo,
      duracionPinMin,
      idplantilla_excel || null,
      idUsuario
    ]);

    await conn.commit();
    return true;

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
      `SELECT idPersona FROM usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (!usuario) throw new Error('Usuario no existe');

    await conn.query(`DELETE FROM usuario WHERE idUsuario=?`, [idUsuario]);
    await conn.query(`DELETE FROM persona WHERE idPersona=?`, [usuario.idPersona]);

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
