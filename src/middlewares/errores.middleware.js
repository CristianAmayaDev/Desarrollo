const rutaNoEncontrada = (req, res) => {
    res.status(404).json({
        mensaje: "Recurso no encontrado"
    });
};
const manejarError = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        mensaje: "Error interno del servidor"
    });
};
module.exports = {
    rutaNoEncontrada,
    manejarError
};