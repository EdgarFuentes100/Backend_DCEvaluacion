const { localDB } = require('../config/db');


// ✅ Obtener resultados
async function getResultados() {
  const [rows] = await localDB.query(`
    SELECT 
      p.nombreCompleto,
      p.dui,
      u.idUsuario,
      r.idResultado,
      r.prueba1,
      r.prueba2,
      r.prueba3,
      r.aprobado,
      r.motivo
    FROM persona p
    INNER JOIN usuario u ON u.idPersona = p.idPersona
    INNER JOIN resultado r ON r.idUsuario = u.idUsuario
  `);

  return rows;
}


// Actualizar resultado
async function actualizarResultado(idUsuario, data) {
  const {
    prueba1,
    prueba2,
    prueba3,
    aprobado,
    motivo
  } = data;

  const [result] = await localDB.query(`
    UPDATE resultado
    SET 
      prueba1 = ?,
      prueba2 = ?,
      prueba3 = ?,
      aprobado = ?,
      motivo = ?
    WHERE idUsuario = ?
  `, [prueba1, prueba2, prueba3, aprobado, motivo, idUsuario]);

  return result;
}

async function actualizarPrueba3(idUsuario) {
  const [result] = await localDB.query(`
    UPDATE resultado res
    JOIN (
        SELECT 
            i.idUsuario,
            AVG(r.porcentaje) AS promedio
        FROM respuestas r
        JOIN intentos i ON r.idIntento = i.idIntento
        WHERE i.idUsuario = ?
        GROUP BY i.idUsuario
    ) t ON t.idUsuario = res.idUsuario
    SET 
        res.prueba3 = CONCAT('El promedio de desempeño es: ', ROUND(t.promedio, 2), '%')
    WHERE res.idUsuario = ?;
  `, [idUsuario, idUsuario]);

  return result;
}

module.exports = {
  getResultados,
  actualizarResultado,
  actualizarPrueba3
};