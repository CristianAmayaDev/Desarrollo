const { matchedData } = require("express-validator");
const usuariosService =
    require("../services/usuarios.service");
const obtenerUsuarios = (req, res) => {
    const usuarios =
        usuariosService.obtenerUsuarios();
    res.status(200).json(usuarios);
};
const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    const usuario =
        usuariosService.obtenerUsuarioPorId(id);
    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }
    res.status(200).json(usuario);
};
const crearUsuario = (req, res) => {
    const datosPermitidos = matchedData(req, {
        locations: ["body"]
    });
    const usuarioCreado =
        usuariosService.crearUsuario(datosPermitidos);
    res.status(201).json({
        mensaje: "Usuario creado correctamente",
        usuario: usuarioCreado
    });
};
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const datosPermitidos = matchedData(req, {
        locations: ["body"]
    });
    const usuarioActualizado =
        usuariosService.actualizarUsuario(
            id,
            datosPermitidos
        );
    if (!usuarioActualizado) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }
    res.status(200).json({
        mensaje: "Usuario actualizado correctamente",
        usuario: usuarioActualizado
    });
};
const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    const usuarioEliminado =
        usuariosService.eliminarUsuario(id);
    if (!usuarioEliminado) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }
    res.status(200).json({
        mensaje: "Usuario eliminado correctamente",
        usuario: usuarioEliminado
    });
};
module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};