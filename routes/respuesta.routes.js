const express = require("express");
const router = express.Router();

const {
  listarPorIntento,
  guardar
} = require("../controllers/respuesta.controller");

router.get("/:idIntento", listarPorIntento);
router.post("/", guardar);


module.exports = router;
