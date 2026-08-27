const express = require("express");
const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     CalculoEntrada:
 *       type: object
 *       required:
 *         - a
 *         - b
 *         - operacion
 *       properties:
 *         a:
 *           type: number
 *           example: 10
 *         b:
 *           type: number
 *           example: 20
 *         operacion:
 *           type: string
 *           enum:
 *             - sumar
 *             - restar
 *             - multiplicar
 *             - dividir
 *           example: sumar
 *
 *     CalculoResultado:
 *       type: object
 *       properties:
 *         resultado:
 *           type: number
 *           example: 30
 */

/**
 * @openapi
 * /api/calcular:
 *   post:
 *     tags:
 *       - Calculadora
 *     summary: Realizar una operación matemática
 *     description: Ejecuta una operación permitida sin utilizar eval().
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalculoEntrada'
 *
 *     responses:
 *       200:
 *         description: Operación realizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculoResultado'
 *
 *       400:
 *         description: Datos u operación inválidos
 */

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