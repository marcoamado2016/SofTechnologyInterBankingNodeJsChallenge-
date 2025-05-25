import { Container } from "inversify";
import { IEmpresaRepositorio } from "../dominio/repositorio/empresa.repositorio";
import { EmpresaService } from "../aplicacion/empresa.service";
import { EmpresaMongoRepositorio } from "./repositorio/repositorioImplementado/empresaMongoRepositorio";
import { TYPES } from "../compartido/types";
import { IUsuarioReposiotrio } from "../dominio/repositorio/usuario.repositorio";
import { UsuarioMongoRepositorio } from "./repositorio/repositorioImplementado/usuarioMongoRepositorio";
import { UsuarioService } from "../aplicacion/usuario.service";
import { ICuentaRepositorio } from "../dominio/repositorio/cuenta.repositorio";
import { CuentaMongoRepositorio } from "./repositorio/repositorioImplementado/cuentaMongoRepositorio";
import { CuentaService } from "../aplicacion/cuenta.service";

const container = new Container();

container.bind<IEmpresaRepositorio>(TYPES.EmpresaRepositorio).to(EmpresaMongoRepositorio);
container.bind<EmpresaService>(EmpresaService).toSelf();

container.bind<IUsuarioReposiotrio>(TYPES.UsuarioRepositorio).to(UsuarioMongoRepositorio);
container.bind<EmpresaService>(UsuarioService).toSelf();

container.bind<ICuentaRepositorio>(TYPES.CuentaRepositorio).to(CuentaMongoRepositorio)
container.bind<CuentaService>(CuentaService).toSelf();
export default container;
