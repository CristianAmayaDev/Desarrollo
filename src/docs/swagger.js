const swaggerJsdoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "API Seguridad",
            version: "1.0.0",
            description:
                "API REST desarrollada con Node.js y Express para el laboratorio de seguridad, hardening y análisis SAST, SCA y DAST."
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],
        tags: [
            {
                name: "Usuarios",
                description: "Operaciones relacionadas con usuarios"
            },
            {
                name: "Calculadora",
                description: "Operaciones de cálculo controladas"
            }
        ]
    },
    apis: [
        "./src/routes/*.js"
    ]
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;