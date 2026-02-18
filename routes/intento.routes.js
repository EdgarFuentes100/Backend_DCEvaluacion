const express = require("express");
const router = express.Router();
const intentoController = require("../controllers/intento.controller");

router.post("/", intentoController.iniciarIntento);
router.put("/finalizar/:idIntento", intentoController.finalizarIntento);

module.exports = router;
