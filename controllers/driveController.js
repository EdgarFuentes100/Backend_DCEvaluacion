const { crearCarpeta } = require("../services/crearCarpeta");
const { subirArchivo } = require("../services/subirArchivo");

const DRIVE_ROOT_ID = process.env.DRIVE_ROOT_FOLDER_ID;

async function crearEstructuraController(req, res) {
  try {
    console.log("➡️ crearEstructuraController BODY:", req.body);

    const { usuarioId, usuarioNombre, nombrePrueba } = req.body;

    if (!usuarioId || !usuarioNombre || !nombrePrueba) {
      return res.status(400).json({
        ok: false,
        mensaje: "Datos incompletos"
      });
    }

    console.log("📁 ROOT:", DRIVE_ROOT_ID);

    const carpetaUsuario = `${usuarioId}_${usuarioNombre}`;

    const usuarioFolderId = await crearCarpeta(
      carpetaUsuario,
      DRIVE_ROOT_ID
    );

    console.log("✅ Carpeta usuario:", usuarioFolderId);

    const pruebaFolderId = await crearCarpeta(
      nombrePrueba,
      usuarioFolderId
    );

    console.log("✅ Carpeta prueba:", pruebaFolderId);

    res.json({
      ok: true,
      datos: {
        usuarioFolderId,
        pruebaFolderId
      }
    });

  } catch (error) {
    console.error("❌ crearEstructuraController:", error);
    res.status(500).json({
      ok: false,
      mensaje: error.message
    });
  }
}

/**
 * ==================================================
 * 2️⃣ SUBIR SOLO FOTOS
 * ==================================================
 */
async function subirFotosController(req, res) {
  try {
    console.log("➡️ subirFotosController");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { folderId } = req.body;

    if (!folderId) {
      return res.status(400).json({
        ok: false,
        mensaje: "folderId faltante"
      });
    }

    if (!req.files || !req.files.fotos) {
      return res.status(400).json({
        ok: false,
        mensaje: "No se recibieron fotos"
      });
    }

    const resultados = [];

    for (const foto of req.files.fotos) {
      console.log("📸 Subiendo:", foto.originalname);

      const fileId = await subirArchivo(folderId, foto);

      resultados.push({
        nombre: foto.originalname,
        fileId
      });
    }

    res.json({
      ok: true,
      datos: resultados
    });

  } catch (error) {
    console.error("❌ subirFotosController:", error);
    res.status(500).json({
      ok: false,
      mensaje: error.message
    });
  }
}

/**
 * ==================================================
 * 3️⃣ SUBIR SOLO EXCEL
 * ==================================================
 */
async function subirExcelController(req, res) {
  try {
    console.log("➡️ subirExcelController");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { folderId } = req.body;

    if (!folderId) {
      return res.status(400).json({
        ok: false,
        mensaje: "folderId faltante"
      });
    }

    if (!req.files || !req.files.excel) {
      return res.status(400).json({
        ok: false,
        mensaje: "Excel no recibido"
      });
    }

    const excel = req.files.excel[0];

    console.log("📊 Subiendo excel:", excel.originalname);

    const fileId = await subirArchivo(folderId, excel);

    res.json({
      ok: true,
      datos: {
        nombre: excel.originalname,
        fileId
      }
    });

  } catch (error) {
    console.error("❌ subirExcelController:", error);
    res.status(500).json({
      ok: false,
      mensaje: error.message
    });
  }
}

module.exports = {
  crearEstructuraController,
  subirFotosController,
  subirExcelController
};
