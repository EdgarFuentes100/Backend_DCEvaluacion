// models/usuarios.model.js
const { localDB } = require('../config/db');

async function getUsuarioPorPin(pin) {
  const [rows] = await localDB.query(
    `SELECT
        u.idUsuario,
        p.nombreCompleto AS nombre,
        r.rol AS rol
    FROM usuario u
    JOIN persona p ON u.idPersona = p.idPersona
    JOIN rol r ON u.idRol = r.idRol
    WHERE u.pinCode = ?
      AND u.activo = TRUE`,
    [pin]
  );
    console.log(`Resultados encontrados: ${rows.length}`);
  if (rows.length > 0) {
    console.log('Usuario encontrado:', rows[0]);
  }
  
  return rows.length > 0 ? rows[0] : null;
}

module.exports = {
  getUsuarioPorPin,
};
