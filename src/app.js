require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const usuariosRoutes =
    require("./routes/usuarios.routes");
const calculadoraRoutes =
    require("./routes/calculadora.routes");
const {
    rutaNoEncontrada,
    manejarError
} = require("./middlewares/errores.middleware");
const app = express();
const PORT = process.env.PORT || 3000;
// ========================================
// 1. Ocultar tecnología utilizada
// ========================================
app.disable("x-powered-by");
// ========================================
// 2. Cabeceras HTTP de seguridad
// ========================================
app.use(helmet());
// ========================================
// 3. CORS
// ========================================
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGIN,
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ]
    })
);
// ========================================
// 4. Limitar tamaño del JSON
// ========================================
app.use(
    express.json({
        limit: "10kb"
    })
);
// ========================================
// 5. Rate Limiting
// ========================================
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        mensaje:
            "Demasiadas solicitudes. Intente nuevamente más tarde."
    }
});
app.use("/api", limiter);
// ========================================
// 6. Ruta inicial
// ========================================
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API de Seguridad funcionando"
    });
});
// ========================================
// 7. Rutas
// ========================================
app.use(
    "/api/usuarios",
    usuariosRoutes
);
app.use(
    "/api/calcular",
    calculadoraRoutes
);
// ========================================
// 8. Ruta no encontrada
// ========================================
app.use(rutaNoEncontrada);
// ========================================
// 9. Manejo centralizado de errores
// ========================================
app.use(manejarError);
// ========================================
// 10. Servidor
// ========================================
app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});