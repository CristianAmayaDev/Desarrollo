const { validationResult } = require("express-validator");
const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: "Datos de entrada inválidos",
            errores: errores.array().map((error) => ({
                campo: error.path,
                mensaje: error.msg
            }))
        });
    }
    next();
};
module.exports = validar;