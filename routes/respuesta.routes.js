const express = require("express");
const router = express.Router();
const respuestaController = require("../controllers/respuesta.controller");

// GET respuestas de un intento
router.get("/:idIntento", respuestaController.listarPorIntento);

// POST guardar respuesta
router.post("/", respuestaController.guardar);

module.exports = router;
