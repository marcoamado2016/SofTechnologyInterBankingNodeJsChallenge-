import { inject, injectable } from "inversify";
import { TYPES } from "../compartido/types";
import { UsuarioReposiotrio } from "../dominio/repositorio/usuario.repositorio";
import { UsuarioEntity } from "../dominio/entidad/usuario";
import jwt from "jsonwebtoken"
import { Respuesta } from "../dominio/entidad/respuesta";
import bcrypt from 'bcrypt';
import Usuario, { ISchemaUsuario } from "../infrastructura/repositorio/schema/usuarioModel";

@injectable()
export class UsuarioService {
    constructor(@inject(TYPES.UsuarioRepositorio) private usuarioRepositorio: UsuarioReposiotrio) { }
    async crearUsaurio(user: UsuarioEntity): Promise<Respuesta> {
        let { password, usuario } = user;
        password = await bcrypt.hash(password, 10);
        const newUsuario: ISchemaUsuario = new Usuario({
            usuario, password
        })
        return await this.usuarioRepositorio.crearUsuario(newUsuario);
    }
    async login(user: UsuarioEntity): Promise<Respuesta> {
        const SECRET_KEY = process.env.SECRET_KEY;
        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY no definida en variables de entorno");
        }
        const { password, usuario } = user;
        const objetoEncontrado = await this.usuarioRepositorio.findOneUsuario(usuario);
        if (!objetoEncontrado.data) throw new Error("No se encontro el usuario");
        const contraseniaValida = await bcrypt.compare(password, objetoEncontrado.data.password);
        if (!contraseniaValida) throw new Error("password incorrecto");
        const token = jwt.sign({ id: objetoEncontrado.data._id, usuario: objetoEncontrado.data.usuario }, SECRET_KEY, {
            expiresIn: '1h'
        })
        return new Respuesta("TOKEN", token);
    }
}