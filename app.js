const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const pacienteRoutes = require('./routes/pacientes.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://frontend-dc-evaluacion.vercel.app",
    "https://frontend-dc-evaluacion-pp5p.vercel.app"
  ],
  credentials: true
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/paciente', pacienteRoutes);


app.listen(4000, () => console.log('Servidor en puerto 4000'));
