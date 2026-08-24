# api-seguridad_v2

API REST desarrollada con **Node.js** y **Express**, construida originalmente como una API deliberadamente vulnerable (Lab 1 y Lab 2) y posteriormente endurecida (Lab 3) aplicando controles de seguridad reales, verificados mediante herramientas de análisis SAST, SCA y DAST.

## Descripción general

El proyecto expone un CRUD de usuarios y un endpoint de calculadora, y sirve como caso de estudio para el ciclo completo de seguridad en el desarrollo de software:

```
API vulnerable → Hardening → API más segura → Verificación de cambios
```

Cada corrección aplicada sigue el mismo ciclo: **reproducir el problema → modificar el código → repetir la prueba → confirmar con evidencia**.

## ¿Cómo se desarrolló?

El proyecto se construyó en tres etapas:

1. **Lab 1** — Implementación de la API base (CRUD de usuarios + endpoint de calculadora), introduciendo intencionalmente vulnerabilidades: validación insuficiente, Mass Assignment, uso de `eval()`, secreto hardcodeado, ausencia de cabeceras de seguridad.
2. **Lab 2** — Análisis de la API vulnerable con herramientas SAST (Semgrep), SCA (`npm audit`) y DAST (OWASP ZAP), documentando los hallazgos.
3. **Lab 3** — Hardening de la API: se corrigieron los hallazgos anteriores modificando los archivos existentes (sin reescribir el proyecto desde cero) y se repitieron los análisis para verificar las correcciones.

## Estructura del proyecto

```
api-seguridad_v2/
├── src/
│   ├── controllers/
│   │   └── usuarios.controller.js
│   ├── data/
│   │   └── usuarios.js
│   ├── middlewares/
│   │   ├── errores.middleware.js
│   │   ├── usuarios.validator.js
│   │   └── validar.middleware.js
│   ├── routes/
│   │   ├── calculadora.routes.js
│   │   └── usuarios.routes.js
│   ├── services/
│   │   └── usuarios.service.js
│   └── app.js
├── .env                # configuración real (NO se sube al repo)
├── .env.example        # plantilla pública de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Verifica que la API esté funcionando |
| GET | `/api/usuarios` | Lista todos los usuarios |
| GET | `/api/usuarios/:id` | Obtiene un usuario por ID |
| POST | `/api/usuarios` | Crea un usuario nuevo |
| PUT | `/api/usuarios/:id` | Actualiza un usuario existente |
| DELETE | `/api/usuarios/:id` | Elimina un usuario |
| POST | `/api/calcular` | Ejecuta una operación aritmética controlada (`sumar`, `restar`, `multiplicar`, `dividir`) |

### Ejemplo — crear usuario

```json
POST /api/usuarios
{
  "nombre": "Ana Torres",
  "email": "ana@correo.com",
  "edad": 22
}
```

### Ejemplo — calculadora

```json
POST /api/calcular
{
  "a": 10,
  "b": 20,
  "operacion": "sumar"
}
```

## Controles de seguridad aplicados (Hardening)

| Problema original | Solución implementada | Paquete / mecanismo |
|---|---|---|
| Validación insuficiente | Validación y sanitización de entradas | `express-validator` |
| Mass Assignment | Allowlist explícita de propiedades permitidas | `matchedData()` + construcción explícita del objeto en el service |
| Ejecución dinámica de código (`eval()`) | Calculadora con operaciones controladas por `switch` | Contrato de API rediseñado (`a`, `b`, `operacion`) |
| Secreto hardcodeado | Variables de entorno | `dotenv` |
| Exposición de tecnología (`X-Powered-By`) | Cabecera deshabilitada | `app.disable("x-powered-by")` |
| Cabeceras HTTP inseguras | Cabeceras de seguridad HTTP | `helmet` |
| CORS abierto/inadecuado | Política de orígenes restringida | `cors` |
| Abuso de endpoints | Limitación de solicitudes | `express-rate-limit` |
| Errores inconsistentes | Manejo centralizado de errores | `errores.middleware.js` |
| Configuración expuesta | Separación de configuración real vs. plantilla | `.env` + `.env.example` + `.gitignore` |

## Aplicaciones y herramientas utilizadas

- **Node.js** + **Express** — runtime y framework del servidor.
- **express-validator** — validación y sanitización de datos de entrada.
- **helmet** — cabeceras HTTP de seguridad.
- **dotenv** — gestión de variables de entorno.
- **cors** — control de orígenes permitidos.
- **express-rate-limit** — limitación de solicitudes por IP/tiempo.
- **Thunder Client / Postman** — pruebas manuales de los endpoints.
- **Semgrep** — análisis estático de código (SAST).
- **npm audit** — análisis de composición de dependencias (SCA).
- **OWASP ZAP** — análisis dinámico de la aplicación en ejecución (DAST).

## Instalación y ejecución

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo `.env` en la raíz (basado en `.env.example`) con la configuración real:

   ```
   PORT=3000
   ALLOWED_ORIGIN=http://localhost:5500
   JWT_SECRET=colocar_aqui_un_secreto_real
   ```

3. Levantar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Verificar que esté corriendo:

   ```
   GET http://localhost:3000
   → { "mensaje": "API de Seguridad funcionando" }
   ```

## Verificación de seguridad (reproducible)

```bash
# SAST
semgrep --config=auto src

# SCA
npm audit

# DAST
# Levantar la API (npm run dev) y ejecutar OWASP ZAP contra http://localhost:3000
```

## Notas de seguridad

- El archivo `.env` **nunca** debe subirse al repositorio; está excluido vía `.gitignore`.
- `.env.example` es la única plantilla que debe compartirse públicamente, y no contiene secretos reales.
- Antes de desplegar en producción, se recomienda añadir autenticación (JWT), persistencia real (base de datos) y logging estructurado de errores.

## Autor

Cristian Rodrigo Amaya Torres — Ingeniería de Sistemas, Universidad Santo Tomás de Aquino, Tunja.