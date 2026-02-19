const { localDB } = require("../config/db");


// 🔹 Obtener respuestas de un intento
async function obtenerPorIntento(idIntento) {
  const [rows] = await localDB.query(`
    SELECT 
      idRespuesta,
      idPregunta,
      respuesta
    FROM respuestas
    WHERE idIntento = ?
  `, [idIntento]);

  return rows;
}


// 🔹 Insertar o actualizar (UPSERT)
async function guardar(idIntento, idPregunta, respuesta) {
  await localDB.query(`
    INSERT INTO respuestas (idIntento, idPregunta, respuesta)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      respuesta = VALUES(respuesta)
  `, [idIntento, idPregunta, respuesta]);
}

module.exports = {
  obtenerPorIntento,
  guardar
};
