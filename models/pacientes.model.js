// models/pacientes.js
const { localDB } = require('../config/db');

// Obtener todos los pacientes (desde BD local)
async function getPacientes() {
  const [rows] = await localDB.query(`
    SELECT p.idPaciente, p.Expediente, concat(pe.nombre, '' , pe.apellido) as nombre, 
           pe.telefono, pe.email, pe.direccion FROM paciente p 
    join persona pe on p.idPersona = pe.idPersona;`);
  return rows;
}

// Obtener un paciente por ID (desde BD local)
async function getPacienteById(id) {
  const [rows] = await localDB.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);
  return rows[0] || null;
}

// Crear paciente
async function crearPaciente(data) {
  if (!data) {
    throw new Error('No se recibieron datos para crear paciente');
  }
  const { nombre, apellido, fechaNacimiento } = data;

  const sql = 'INSERT INTO paciente (nombre, apellido, fechaNacimiento) VALUES (?, ?, ?)';
  const params = [nombre, apellido, fechaNacimiento];

  const [result] = await localDB.query(sql, params);

  return { id: result.insertId, ...data };
}

// Actualizar paciente
async function actualizarPaciente(id, data) {
  const { nombre, apellido, fechaNacimiento } = data;
  const sql = 'UPDATE paciente SET nombre=?, apellido=?, fechaNacimiento=? WHERE idPaciente=?';
  const params = [nombre, apellido, fechaNacimiento, id];

  await localDB.query(sql, params);

  return getPacienteById(id);
}

// Eliminar paciente
async function eliminarPaciente(id) {
  const sql = 'DELETE FROM paciente WHERE idPaciente=?';
  const params = [id];

  await localDB.query(sql, params);

  return true;
}

module.exports = {
  getPacientes,
  getPacienteById,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
};
