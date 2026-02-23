const { localDB } = require("../config/db");


// 🔹 Obtener respuestas de un intento
async function obtenerPorIntento(idIntento) {
  const [rows] = await localDB.query(`
    SELECT 
      idRespuesta,
      idPregunta,
      respuesta,
      peso, 
      porcentaje
    FROM respuestas
    WHERE idIntento = ?
  `, [idIntento]);

  return rows;
}


async function guardar(idIntento, idPregunta, respuesta, peso, porcentaje) {
  await localDB.query(`
    INSERT INTO respuestas (idIntento, idPregunta, respuesta, peso, porcentaje)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      respuesta = VALUES(respuesta),
      peso = VALUES(peso),
      porcentaje = VALUES(porcentaje)
  `, [idIntento, idPregunta, respuesta, peso, porcentaje]);  // ✅ Ahora pasas los 5 valores
}

module.exports = {
  obtenerPorIntento,
  guardar
};
