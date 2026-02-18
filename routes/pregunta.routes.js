const express = require("express");
const router = express.Router();
const preguntaController = require("../controllers/pregunta.controller");

router.get("/:idPrueba", preguntaController.listarPorPrueba);

module.exports = router;
