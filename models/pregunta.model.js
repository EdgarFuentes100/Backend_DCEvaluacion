const { localDB } = require('../config/db');

async function obtenerPreguntasPorPrueba(idPrueba) {
  const [rows] = await localDB.query(`
    SELECT 
      idPregunta,
      pregunta,
      pesoImportancia,
      maximo
    FROM preguntas
    WHERE idPrueba = ?
  `, [idPrueba]);

  return rows;
}

module.exports = {
  obtenerPreguntasPorPrueba
};
