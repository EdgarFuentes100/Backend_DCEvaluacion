const express = require('express');
const router = express.Router();
const plantilla_excel = require('../controllers/plantilla.controller');

router.get('/listar', plantilla_excel.listar);

module.exports = router;

