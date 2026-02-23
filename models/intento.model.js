const { localDB } = require('../config/db');

// 🔎 Verificar si existe intento activo
async function obtenerIntentoActivo(idUsuario, idPrueba) {
  const [rows] = await localDB.query(`
    SELECT idIntento 
    FROM intentos
    WHERE idUsuario = ?
      AND idPrueba = ?
      AND estado = 'activo'
  `, [idUsuario, idPrueba]);

  return rows[0] || null;
}

// 🔎 Contar intentos totales
async function contarIntentos(idUsuario, idPrueba) {
  const [rows] = await localDB.query(`
    SELECT COUNT(*) as total
    FROM intentos
    WHERE idUsuario = ?
      AND idPrueba = ?
  `, [idUsuario, idPrueba]);

  return rows[0].total;
}

// ➕ Crear nuevo intento
async function crearIntento(idUsuario, idPrueba) {
  const [result] = await localDB.query(`
    INSERT INTO intentos (idUsuario, idPrueba)
    VALUES (?, ?)
  `, [idUsuario, idPrueba]);

  return result.insertId;
}

// 🔄 Finalizar intento
async function finalizarIntento(idIntento) {
  await localDB.query(`
    UPDATE intentos
    SET estado = 'inactivo',
        fechaFin = NOW()
    WHERE idIntento = ?
  `, [idIntento]);
}

async function borrar() {
  await localDB.query(`
    DELETE FROM intentos
  `);
}
module.exports = {
  obtenerIntentoActivo,
  contarIntentos,
  crearIntento,
  finalizarIntento,
  borrar
};
