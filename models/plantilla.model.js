// models/pacientes.js
const { localDB } = require('../config/db');

// Obtener todos los pacientes (desde BD local)
async function getPlantilla() {
  const [rows] = await localDB.query(`
    SELECT p.*
FROM plantilla_excel p
LEFT JOIN usuario u 
  ON u.idplantilla_excel = p.idplantilla_excel
WHERE u.idUsuario IS NULL;
`);
  return rows;
}

module.exports = {
  getPlantilla
};
