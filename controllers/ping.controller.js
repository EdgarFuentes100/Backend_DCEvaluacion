async function ping(req, res, next) {
  try {
    res.json({
      ok: true,
      message: "Servidor activo 🚀",
      datos: {
        status: "UP",
        timestamp: new Date()
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  ping
};
