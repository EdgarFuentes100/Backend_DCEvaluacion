const { localDB } = require('../config/db');

async function getResultados(idUsuario) {
  const [rows] = await localDB.query(`
    SELECT 
      h.id AS idHabilidad,
      h.nombre AS habilidad,
      t.promedio_por_habilidad,
      CASE 
          WHEN t.promedio_por_habilidad IS NULL THEN 'Sin respuesta'
          WHEN t.promedio_por_habilidad < 40 THEN 'Baja'
          WHEN t.promedio_por_habilidad BETWEEN 40 AND 70 THEN 'Media'
          WHEN t.promedio_por_habilidad > 70 THEN 'Alta'
      END AS categoria,
      d.texto AS descripcion
    FROM tipo_habilidad h
    LEFT JOIN (
        SELECT 
            p.idTipoHabilidad,
            AVG(r.porcentaje) AS promedio_por_habilidad
        FROM preguntas p
        LEFT JOIN respuestas r 
               ON p.idPregunta = r.idPregunta
               AND r.idIntento = (
                   SELECT MAX(idIntento)
                   FROM intentos
                   WHERE idUsuario = ?
               )
        GROUP BY p.idTipoHabilidad
    ) t ON t.idTipoHabilidad = h.id
    LEFT JOIN descripcion_categoria d 
           ON d.idTipoHabilidad = h.id
          AND d.categoria = CASE 
                                WHEN t.promedio_por_habilidad IS NULL THEN NULL
                                WHEN t.promedio_por_habilidad < 40 THEN 'Baja'
                                WHEN t.promedio_por_habilidad BETWEEN 40 AND 70 THEN 'Media'
                                WHEN t.promedio_por_habilidad > 70 THEN 'Alta'
                            END;
  `, [idUsuario]); 

  return rows;
}

module.exports = {
  getResultados
};