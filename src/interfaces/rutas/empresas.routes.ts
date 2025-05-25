import { Router } from "express";
import {
  AdhesionEmpresaController,
  AdhesionEmpresaUltimoMesController,
  UltimaAdhesionEmpresaController,
} from "../../infrastructura/controllers/empresaController";
import {
  crearUsuarioController,
  login,
} from "../../infrastructura/controllers/usuariosController";
import {
  CuentaBancariaController,
  empresaTransferenciaUltimoMesController,
  transferenciaController,
} from "../../infrastructura/controllers/cuentaControllers";
import { middlewareVerifyToken } from "../../infrastructura/Middleware/auth.middleware";

const rutas = Router();

/**
 * @openapi
 * /login:
 *  post:
 *    summary: Inicia sesión con password y usuario, para generar el token 
 *    tags:
 *      - Usuarios
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              usuario:
 *                type: string
 *                example: Jorge
 *              password:
 *                type: string
 *                example: "22222345"
 *    responses:
 *      200:
 *        description: Token generado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mensaje:
 *                  type: string
 *                  example: "TOKEN"
 *                data:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *      500:
 *        description: Error al generar el token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Error al iniciar sesión"
 */
rutas.post("/login", login);

/** 
 * @openapi
 * /crearUsuario:
 *  post:
 *    summary: Crear un nuevo usuario validando que no esté creado anteriormente
 *    tags:
 *      - Usuarios
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Usuario'
 *    responses:
 *      201:
 *        description: Usuario creado correctamente
 *      400:
 *        description: Error en los datos enviados
 */
rutas.post("/crearUsuario", middlewareVerifyToken, crearUsuarioController);

/**
 * @openapi
 * /crearCuentaBancaria:
 *   post:
 *     summary: Crear una cuenta bancaria
 *     tags:
 *       - Cuenta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuenta'
 *     responses:
 *       201:
 *         description: Cuenta registrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Cuenta registrada
 *                 data:
 *                   type: object
 *                   properties:
 *                     numeroCuenta:
 *                       type: string
 *                       description: Número de cuenta único
 *                       example: "235346"
 *                     saldo:
 *                       type: number
 *                       description: Saldo actual de la cuenta
 *                       example: 333
 *                     idEmpresa:
 *                       type: string
 *                       description: Identificador de la empresa
 *                       example: "1222"
 *                     _id:
 *                       type: string
 *                       description: Identificador de la cuenta
 *                       example: "68315f9412ffaa83a82342c5"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación
 *                       example: "2025-05-24T05:56:36.771Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de actualización
 *                       example: "2025-05-24T05:56:36.771Z"
 *       500:
 *         description: Error al registrar la cuenta bancaria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error inesperado al crear la cuenta
 */

rutas.post("/crearCuentaBancaria", middlewareVerifyToken, CuentaBancariaController);

/**
 * @openapi
 * /adhesionEmpresa:
 *  post:
 *    summary: adhesion de una empresa, que no esta adherida
 *    tags:
 *      - Empresa:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              cuit:
 *                type: string
 *                description: "cuit de la empresa"
 *                example: "2345673421"
 *              razonSocial:
 *                type: string
 *                description: "razonSocial de la empresa"
 *                example: "marco S.A"
 *    responses:
 *      200:
 *        description: La adhesion de la empresa se realiza por unica vez
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mensaje:
 *                  type: string
 *                  example: "Adhesion OK"
 *                  description: "Mensaje ok de adhesion"
 *                data:
 *                  type: object
 *                  properties:
 *                    fechaAdhesion:
 *                      type: string
 *                      example: "2025-05-24T23:40:19.533Z"
 *                      description: "fecha de adhesion de la empresa"
 *                    razonSocial:
 *                      type: string
 *                      example: "marco amado S.A"
 *                      description: "marco S.A"
 *                    cuit:
 *                      type: string
 *                      example: "2345673421"
 *                      description: "cuit de la empresa"
 *                    _id:
 *                       type: string
 *                       description: Identificador de la cuenta
 *                       example: "68315f9412ffaa83a82342c5"
 *                    createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación
 *                       example: "2025-05-24T05:56:36.771Z"
 *                    updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de actualización
 *                       example: "2025-05-24T05:56:36.771Z"
 *      500:
 *         description: Error al registrar adherir una empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al registrar adherir una empresa
 */

rutas.post("/adhesionEmpresa", middlewareVerifyToken, AdhesionEmpresaController);

/**
 * @openapi
 * /adhesionEmpresaUltimoMes:
 *   get:
 *     summary: Obtener las empresas que se adhirieron en el último mes
 *     tags:
 *       - Empresa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas adheridas en el último mes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Empresas encontradas
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fechaAdhesion:
 *                         type: string
 *                         format: date
 *                         example: "2025-05-01"
 *                       razonSocial:
 *                         type: string
 *                         example: "Empresa S.A."
 *                       cuit:
 *                         type: string
 *                         example: "30-12345678-9"
 *       500:
 *         description: Error al obtener las empresas adheridas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error inesperado al obtener las empresas
 */


rutas.get("/adhesionEmpresaUltimoMes", middlewareVerifyToken, AdhesionEmpresaUltimoMesController);

/**
 * @openapi
 * /ultimaAdhesionEmpresa:
 *  get:
 *    summary:
 *    tags:
 *      - Empresa
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description:  La ultima empresa adherida, en el ultimo mes.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mensaje:
 *                  type: string
 *                  example: La ultima empresa adherida, en el ultimo mes.
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      example: "234"
 *                      description: id de la empresa
 *                    fechaAdhesion:
 *                      type: string
 *                      example: 2025-04-01T03:00:00.000Z
 *                      description: fecha de adhesion de la empresa
 *                    razonSocial:
 *                      type: string
 *                      example: "DESARROLLO SA"
 *                      description: razon social de la empresa
 *                    cuit:
 *                      type: string
 *                      example:  "23456783"
 *                      description: "cuit de la empresa"
 *                    createdAt:
 *                      type: string
 *                      example: "2025-05-18T03:01:45.164Z"
 *                      description: "fecha de creacion"
 *                    updatedAt:
 *                      type: string
 *                      example: "2025-05-18T03:01:45.164Z"
 *                      description: "fecha de modificacion"
 *      500:
 *        description: Erro al obtener la ultima empresa adherida, en el ultimo mes.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Erro al obtener la ultima empresa adherida, en el ultimo mes."
 * 
 */

rutas.get("/ultimaAdhesionEmpresa", middlewareVerifyToken, UltimaAdhesionEmpresaController);
/**
 * @openapi
 * /transferencia:
 *   post:
 *     summary: Transferencia del importe entre la cuenta origen y la cuenta destino.
 *     tags:
 *       - Transferencia
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cuentaOrigen:
 *                 type: object
 *                 description: Cuenta origen
 *                 properties:
 *                   numeroCuenta:
 *                     type: string
 *                     description: Número de cuenta de origen
 *                     example: "2"
 *                   saldo:
 *                     type: number
 *                     description: Saldo de cuenta de origen
 *                     example: 123
 *                   idEmpresa:
 *                     type: string
 *                     description: ID de la empresa de la cuenta de origen
 *                     example: "222"
 *               cuentaDestino:
 *                 type: object
 *                 description: Cuenta destino
 *                 properties:
 *                   numeroCuenta:
 *                     type: string
 *                     description: Número de cuenta de destino
 *                     example: "344"
 *                   saldo:
 *                     type: number
 *                     description: Saldo de la cuenta destino
 *                     example: 222
 *                   idEmpresa:
 *                     type: string
 *                     description: ID de la empresa destino
 *                     example: "111"
 *               importe:
 *                 type: number
 *                 description: Monto a transferir de la cuenta origen a la destino
 *                 example: 345
 *     responses:
 *       200:
 *         description: Transferencia exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cuentaOrigen:
 *                   type: object
 *                   description: Cuenta origen después de la transferencia
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID de la cuenta origen
 *                       example: "682ac06d5b717ae508c94d98"
 *                     numeroCuenta:
 *                       type: string
 *                       description: Número de cuenta de origen
 *                       example: "2"
 *                     saldo:
 *                       type: number
 *                       description: Saldo actualizado de la cuenta origen
 *                       example: 2000
 *                     createdAt:
 *                       type: string
 *                       description: Fecha de creación de la cuenta origen
 *                       example: "2025-05-19T05:23:57.239Z"
 *                     updatedAt:
 *                       type: string
 *                       description: Fecha de modificación de la cuenta origen
 *                       example: "2025-05-25T02:00:00.000Z"
 *                 cuentaDestino:
 *                   type: object
 *                   description: Cuenta destino después de la transferencia
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID de la cuenta destino
 *                       example: "68315f9412ffaa83a82342c5"
 *                     numeroCuenta:
 *                       type: string
 *                       description: Número de cuenta destino
 *                       example: "3"
 *                     saldo:
 *                       type: number
 *                       description: Saldo actualizado de la cuenta destino
 *                       example: 5000
 *                     idEmpresa:
 *                       type: string
 *                       description: ID de la empresa de la cuenta destino
 *                       example: "233"
 *                     createdAt:
 *                       type: string
 *                       description: Fecha de creación de la cuenta destino
 *                       example: "2025-05-24T05:56:36.771Z"
 *                     updatedAt:
 *                       type: string
 *                       description: Fecha de modificación de la cuenta destino
 *                       example: "2025-05-25T02:21:24.366Z"
 *       500:
 *         description: Error al realizar la transferencia entre las cuentas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al realizar la transferencia entre las cuentas
 */
rutas.post("/transferencia", middlewareVerifyToken, transferenciaController);

/**
 * @openapi
 * /empresaTransferenciaUltimoMes:
 *   get:
 *     summary: Obtener las transferencias del último mes de las cuentas de empresas.
 *     tags:
 *       - Transferencia
 *     responses:
 *       200:
 *         description: Últimas transferencias de las cuentas de empresas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Transferencia OK"
 *                   description: Estado de la respuesta
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "682ae421e1b5e24396d56bd2"
 *                         description: ID de la transferencia
 *                       fechaTransferencia:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-19T07:56:17.961Z"
 *                         description: Fecha de la transferencia
 *                       importe:
 *                         type: number
 *                         example: 2333
 *                         description: Monto transferido
 *                       idEmpresaOrigen:
 *                         type: string
 *                         example: "1111"
 *                         description: ID de la empresa origen
 *                       numeroCuentaOrigen:
 *                         type: string
 *                         example: "2222"
 *                         description: Número de cuenta origen
 *                       saldoActualOrigen:
 *                         type: number
 *                         example: 11
 *                         description: Saldo actual de la cuenta origen
 *                       idEmpresaDestino:
 *                         type: string
 *                         example: "3333"
 *                         description: ID de la empresa destino
 *                       numeroCuentaDestino:
 *                         type: string
 *                         example: "2"
 *                         description: Número de cuenta destino
 *                       saldoActualDestino:
 *                         type: number
 *                         example: 3
 *                         description: Saldo actual de la cuenta destino
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-19T07:56:18.634Z"
 *                         description: Fecha de creación de la transferencia
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-19T07:56:18.634Z"
 *                         description: Fecha de última modificación de la transferencia
 *       500:
 *         description: Error al buscar la última transferencia del mes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener la última transferencia del último mes"
 */
rutas.get("/empresaTransferenciaUltimoMes", middlewareVerifyToken, empresaTransferenciaUltimoMesController);

export default rutas;
