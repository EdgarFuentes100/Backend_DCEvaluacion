const express = require('express');
const router = express.Router();
const PacientesController = require('../controllers/paciente.controller');

router.get('/listar', PacientesController.listar);
router.get('/:id', PacientesController.obtener);
router.post('/', PacientesController.crear);
router.put('/:id', PacientesController.actualizar);
router.delete('/:id', PacientesController.eliminar);

module.exports = router;

