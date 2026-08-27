const express = require("express");
const router = express.Router();

const usuariosController =
    require("../controllers/usuarios.controller");

const {
    validarId,
    validarUsuario
} = require("../middlewares/usuarios.validator");

const validar =
    require("../middlewares/validar.middleware");

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     description: Retorna la lista de usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get(
    "/",
    usuariosController.obtenerUsuarios
);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Identificador del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *
 *       400:
 *         description: ID inválido
 *
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
    "/:id",
    validarId,
    validar,
    usuariosController.obtenerUsuarioPorId
);

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un usuario
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEntrada'
 *
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post(
    "/",
    validarUsuario,
    validar,
    usuariosController.crearUsuario
);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEntrada'
 *
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *
 *       400:
 *         description: Datos inválidos
 *
 *       404:
 *         description: Usuario no encontrado
 */
router.put(
    "/:id",
    validarId,
    validarUsuario,
    validar,
    usuariosController.actualizarUsuario
);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *
 *       400:
 *         description: ID inválido
 *
 *       404:
 *         description: Usuario no encontrado
 */
router.delete(
    "/:id",
    validarId,
    validar,
    usuariosController.eliminarUsuario
);

module.exports = router;