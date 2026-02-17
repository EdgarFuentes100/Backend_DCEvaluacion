const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ping = require("./routes/ping.routes");
const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const plantillaRoutes = require('./routes/plantilla.routes');
const driveRoutes = require("./routes/driveRoutes");
const emailRoutes = require("./routes/email.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://frontend-dc-evaluacion.vercel.app",
    "https://frontend-dc-evaluacion-pp5p.vercel.app"
  ],
  credentials: true
}));


app.use('/api/v1/ping', ping);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/plantilla', plantillaRoutes);
app.use("/api/v1/drive", driveRoutes);
app.use("/api/v1/email", emailRoutes);

app.listen(4000, () => console.log('Servidor en puerto 4000'));
