const drive = require("../config/driveConfig");

async function crearCarpeta(nombre, parentId = null) {
  let q = `
    name='${nombre}'
    and mimeType='application/vnd.google-apps.folder'
    and trashed=false
  `;

  if (parentId) {
    q += ` and '${parentId}' in parents`;
  }

  const buscarRes = await drive.files.list({
    q,
    fields: "files(id, name)",
    spaces: "drive",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true
  });

  if (buscarRes.data.files.length) {
    return buscarRes.data.files[0].id;
  }

  const crearRes = await drive.files.create({
    requestBody: {
      name: nombre,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : undefined
    },
    fields: "id",
    supportsAllDrives: true
  });

  return crearRes.data.id;
}

module.exports = { crearCarpeta };
