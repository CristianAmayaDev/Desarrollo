const { body, param } = require("express-validator");
const validarId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id debe ser un número entero positivo")
];
const validarUsuario = [
    body("nombre")
        .isString()
        .withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 80 })
        .withMessage("El nombre debe tener entre 2 y 80 caracteres"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email no tiene un formato válido")
        .normalizeEmail(),
    body("edad")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .isInt({ min: 0, max: 120 })
        .withMessage("La edad debe ser un entero entre 0 y 120")
        .toInt()
];
module.exports = {
    validarId,
    validarUsuario
};