const express = require("express");
const router = express.Router();
const usuariosController =
    require("../controllers/usuarios.controller");
const {
    validarId,
    validarUsuario
} = require("../middlewares/usuarios.validator");
const validar =
    require("../middlewares/validar.middleware");
router.get(
    "/",
    usuariosController.obtenerUsuarios
);
router.get(
    "/:id",
    validarId,
    validar,
    usuariosController.obtenerUsuarioPorId
);
router.post(
    "/",
    validarUsuario,
    validar,
    usuariosController.crearUsuario
);
router.put(
    "/:id",
    validarId,
    validarUsuario,
    validar,
    usuariosController.actualizarUsuario
);
router.delete(
    "/:id",
    validarId,
    validar,
    usuariosController.eliminarUsuario
);
module.exports = router;