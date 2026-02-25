const express = require('express');
const router = express.Router();
const ResultadosController = require('../controllers/resultado.controller');

router.get('/listar', ResultadosController.listar);
router.put('/:id', ResultadosController.actualizar);
router.put('/prueba3/:id', ResultadosController.actualizarPrueba3);
router.put('/prueba1/:id', ResultadosController.actualizarPrueba1);

module.exports = router;