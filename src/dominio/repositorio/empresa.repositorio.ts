import { IEmpresaSchema } from "../../infrastructura/repositorio/schema/empresaModel";
import { Respuesta } from "../entidad/respuesta";

export interface EmpresaRepositorio {
    adhesionEmpresa(newEmpresa: IEmpresaSchema): Promise<Respuesta>;
    AdhesionEmpresaultimoMes(mesActual: Date, ultimoMes: Date): Promise<Respuesta>;
    UltimaAdhesionEmpresa(): Promise<Respuesta>;
}