const { Readable } = require("stream");
const drive = require("../config/driveConfig");

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function subirArchivo(carpetaId, archivo) {
  console.log("📤 Subiendo archivo:", archivo.originalname);
  console.log("📄 MIME:", archivo.mimetype);
  console.log("📦 SIZE:", archivo.size);
  console.log("📁 Folder:", carpetaId);

  const response = await drive.files.create({
    requestBody: {
      name: archivo.originalname,
      parents: [carpetaId]
    },
    media: {
      mimeType: archivo.mimetype,
      body: bufferToStream(archivo.buffer) // ✅ stream
    },
    fields: "id"
  });

  console.log("✅ Archivo subido:", response.data.id);
  return response.data.id;
}

module.exports = { subirArchivo };
