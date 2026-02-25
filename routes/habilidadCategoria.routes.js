const express = require('express');
const router = express.Router();
const controller = require('../controllers/habilidadCategoria.controller');

// GET resultados por usuario
router.get('/:id', controller.detalles);

module.exports = router;