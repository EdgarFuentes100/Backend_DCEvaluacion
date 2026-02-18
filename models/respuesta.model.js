const { localDB } = require("../config/db");


// 🔹 Obtener respuestas de un intento
async function obtenerRespuestasPorIntento(idIntento) {
  const [rows] = await localDB.query(`
    SELECT 
      idRespuesta,
      idPregunta,
      valor,
      textoRespuesta
    FROM respuestas
    WHERE idIntento = ?
  `, [idIntento]);

  return rows;
}


// 🔹 Insertar o actualizar (UPSERT)
async function guardarRespuesta(idIntento, idPregunta, valor, textoRespuesta) {
  await localDB.query(`
    INSERT INTO respuestas (idIntento, idPregunta, valor, textoRespuesta)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      valor = VALUES(valor),
      textoRespuesta = VALUES(textoRespuesta)
  `, [idIntento, idPregunta, valor, textoRespuesta]);
}

module.exports = {
  obtenerRespuestasPorIntento,
  guardarRespuesta
};
