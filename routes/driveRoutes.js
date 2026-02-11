const express = require("express");
const multer = require("multer");

const {
  crearEstructuraController,
  subirFotosController,
  subirExcelController
} = require("../controllers/driveController");

const router = express.Router();

// ==============================
// MULTER (MEMORIA)
// ==============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB por archivo (ajustable)
  }
});

// ==============================
// 1️⃣ CREAR / BUSCAR ESTRUCTURA
// ==============================
router.post(
  "/crear-estructura",
  crearEstructuraController
);

// ==============================
// 2️⃣ SUBIR SOLO FOTOS
// ==============================
router.post(
  "/subir-fotos",
  upload.fields([
    { name: "fotos", maxCount: 50 }
  ]),
  subirFotosController
);

// ==============================
// 3️⃣ SUBIR SOLO EXCEL
// ==============================
router.post(
  "/subir-excel",
  upload.fields([
    { name: "excel", maxCount: 1 }
  ]),
  subirExcelController
);

module.exports = router;
