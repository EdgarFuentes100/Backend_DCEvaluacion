// models/usuarios.model.js
const { localDB } = require('../config/db');

async function getUsuarioPorPin(pin) {
  const [rows] = await localDB.query(
    `SELECT
        u.idUsuario,
        u.idRol,
        u.pinCreadoEn,
        u.duracionPinMin,
        p.nombreCompleto AS nombre,
        r.rol AS rol,
        u.idplantilla_excel,
        pe.url AS urlPlantilla,
        NOW() AS fechaServidor,
        DATE_ADD(u.pinCreadoEn, INTERVAL u.duracionPinMin MINUTE) AS pinVenceEn
     FROM usuario u
     JOIN persona p ON u.idPersona = p.idPersona
     JOIN rol r ON u.idRol = r.idRol
     LEFT JOIN plantilla_excel pe 
        ON u.idplantilla_excel = pe.idplantilla_excel
     WHERE u.pinCode = ?
       AND u.activo = TRUE`,
    [pin]
  );

  if (rows.length === 0) return null;

  const u = rows[0];

  if (u.idRol === 1) {
    return u;
  }

  const ahora = new Date(u.fechaServidor);
  const vence = new Date(u.pinVenceEn);

  if (ahora > vence) {
    return null;
  }

  return u;
}

module.exports = {
  getUsuarioPorPin,
};
