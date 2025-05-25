import { ISchemaUsuario } from "../../infrastructura/repositorio/schema/usuarioModel";
import { Respuesta } from "../entidad/respuesta";

export interface IUsuarioReposiotrio {
    crearUsuarioRepositorio(newUsuario: ISchemaUsuario): Promise<Respuesta>;
    findOneUsuarioRepositorio(usuario:string):Promise<Respuesta>;
}