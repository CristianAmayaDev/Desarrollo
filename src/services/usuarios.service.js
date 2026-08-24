const usuarios = require("../data/usuarios");
const obtenerUsuarios = () => {
    return usuarios;
};
const obtenerUsuarioPorId = (id) => {
    return usuarios.find(
        usuario => usuario.id === Number(id)
    );
};
const crearUsuario = (datos) => {
    const nuevoId =
        usuarios.length > 0
            ? Math.max(...usuarios.map(u => u.id)) + 1
            : 1;
    const usuario = {
        id: nuevoId,
        nombre: datos.nombre,
        email: datos.email,
        edad: datos.edad
    };
    usuarios.push(usuario);
    return usuario;
};
const actualizarUsuario = (id, datos) => {
    const indice = usuarios.findIndex(
        usuario => usuario.id === Number(id)
    );
    if (indice === -1) {
        return null;
    }
    usuarios[indice] = {
        id: usuarios[indice].id,
        nombre: datos.nombre,
        email: datos.email,
        edad: datos.edad
    };
    return usuarios[indice];
};
const eliminarUsuario = (id) => {
    const indice = usuarios.findIndex(
        usuario => usuario.id === Number(id)
    );
    if (indice === -1) {
        return null;
    }
    const usuarioEliminado =
        usuarios.splice(indice, 1);
    return usuarioEliminado[0];
};
module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};