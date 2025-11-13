const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @api {post} /auth/register Registrar usuario
 * @apiName RegisterUser
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} name Nombre del usuario
 * @apiParam {String} email Email del usuario
 * @apiParam {String} password Contraseña (mínimo 6 caracteres)
 * @apiParam {String="admin","client"} [role=client] Rol del usuario
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} user Datos del usuario registrado
 * @apiSuccess {String} user.id ID del usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.email Email del usuario
 * @apiSuccess {String} user.role Rol del usuario
 * @apiSuccess {String} token Token JWT de autenticación
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Usuario registrado exitosamente",
 *       "user": {
 *         "id": 1,
 *         "name": "Pedro Coral",
 *         "email": "pcoral@email.com",
 *         "role": "client"
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 * 
 * @apiError (Error 400) {String} error El usuario ya existe
 * @apiError (Error 500) {String} error Error interno del servidor
 */
router.post('/register', register);

/**
 * @api {post} /auth/login Iniciar sesión
 * @apiName LoginUser
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} email Email del usuario
 * @apiParam {String} password Contraseña del usuario
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} user Datos del usuario
 * @apiSuccess {String} user.id ID del usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.email Email del usuario
 * @apiSuccess {String} user.role Rol del usuario
 * @apiSuccess {String} token Token JWT de autenticación
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login exitoso",
 *       "user": {
 *         "id": 1,
 *         "name": "Pedro Coral",
 *         "email": "pcoral@email.com",
 *         "role": "client"
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 * 
 * @apiError (Error 401) {String} error Credenciales inválidas
 * @apiError (Error 500) {String} error Error interno del servidor
 */
router.post('/login', login);

module.exports = router;