// routes/emailRoutes.js
const express = require("express");
const multer = require("multer");
const { enviarEmailController } = require("../controllers/emailController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/v1/email
router.post(
  "/",
  upload.fields([
    { name: "fotos", maxCount: 50 },
    { name: "excel", maxCount: 1 }
  ]),
  enviarEmailController
);

module.exports = router;
