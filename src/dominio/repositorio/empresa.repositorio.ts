import { IEmpresaSchema } from "../../infrastructura/repositorio/schema/empresaModel";
import { Respuesta } from "../entidad/respuesta";

export interface IEmpresaRepositorio {
  adhesionEmpresaRepositorio(newEmpresa: IEmpresaSchema): Promise<Respuesta>;
  AdhesionEmpresaultimoMesRepositorio(
    mesActual: Date,
    ultimoMes: Date
  ): Promise<Respuesta>;
  UltimaAdhesionEmpresaRepositorio(): Promise<Respuesta>;
}
