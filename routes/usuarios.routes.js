const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuario.controller');

router.get('/listar', UsuariosController.listar);
router.post('/', UsuariosController.crear);
router.put('/:id', UsuariosController.actualizar);
router.delete('/:id', UsuariosController.eliminar);

module.exports = router;
