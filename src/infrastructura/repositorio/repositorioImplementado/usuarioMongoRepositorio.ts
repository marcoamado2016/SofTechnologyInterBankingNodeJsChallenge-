import { Respuesta } from "../../../dominio/entidad/respuesta";
import { IUsuarioReposiotrio } from "../../../dominio/repositorio/usuario.repositorio";
import Usuario, { ISchemaUsuario } from "../schema/usuarioModel";

export class UsuarioMongoRepositorio implements IUsuarioReposiotrio {
  async crearUsuarioRepositorio(
    newUsuario: ISchemaUsuario
  ): Promise<Respuesta> {
    try {
      const usuarioSave = await newUsuario.save();
      const usuarioObj = usuarioSave.toObject();
      delete usuarioObj.password;
      return new Respuesta("Usuario creado OK", usuarioObj);
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async findOneUsuarioRepositorio(usuario: string): Promise<Respuesta> {
    try {
      const usuarioEncontrado = await Usuario.findOne({ usuario });
      return new Respuesta("Busqueda de usuario ", usuarioEncontrado);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
