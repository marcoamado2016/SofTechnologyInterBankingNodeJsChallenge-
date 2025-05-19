
import { Router } from "express";
import { AdhesionEmpresa, AdhesionEmpresaultimoMes, UltimaAdhesionEmpresa, } from "../../infrastructura/controllers/empresaController";
import { crearUsuario, login } from "../../infrastructura/controllers/usuariosController";
import { Cuenta, empresaTransferenciaUltimoMes, transferencia } from "../../infrastructura/controllers/cuentaControllers";
import { middleware } from "../../infrastructura/Middleware/auth.middleware";

const rutas = Router();
rutas.post('/login', login)
rutas.post('/adhesionEmpresa', middleware, AdhesionEmpresa);
rutas.get('/adhesionEmpresaUltimoMes', middleware, AdhesionEmpresaultimoMes);
rutas.get('/ultimaAdhesionEmpresa', middleware, UltimaAdhesionEmpresa);
rutas.post('/transferencia', middleware, transferencia);
rutas.get('/empresaTransferenciaUltimoMes', middleware, empresaTransferenciaUltimoMes);
rutas.post('/crearCuenta', middleware, Cuenta);
rutas.post('/crearUsuario', middleware, crearUsuario);
export default rutas;