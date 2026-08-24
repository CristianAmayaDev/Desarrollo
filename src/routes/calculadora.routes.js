const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
    const { a, b, operacion } = req.body;
    if (
        typeof a !== "number" ||
        typeof b !== "number"
    ) {
        return res.status(400).json({
            mensaje: "a y b deben ser números"
        });
    }
    let resultado;
    switch (operacion) {
        case "sumar":
            resultado = a + b;
            break;
        case "restar":
            resultado = a - b;
            break;
        case "multiplicar":
            resultado = a * b;
            break;
        case "dividir":
            if (b === 0) {
                return res.status(400).json({
                    mensaje: "No es posible dividir por cero"
                });
            }
            resultado = a / b;
            break;
        default:
            return res.status(400).json({
                mensaje: "Operación no permitida"
            });
    }
    res.status(200).json({
        resultado
    });
});
module.exports = router;