import { ISchemaUsuario } from "../../infrastructura/repositorio/schema/usuarioModel";
import { Respuesta } from "../entidad/respuesta";

export interface UsuarioReposiotrio {
    crearUsuario(newUsuario: ISchemaUsuario): Promise<Respuesta>;
    findOneUsuario(usuario:string):Promise<Respuesta>;
}