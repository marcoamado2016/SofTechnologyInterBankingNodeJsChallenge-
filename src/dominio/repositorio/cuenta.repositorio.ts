import { ICuentaSchema } from "../../infrastructura/repositorio/schema/cuentaModel";
import { ITransferenciaSchema } from "../../infrastructura/repositorio/schema/transferenciaModel";
import { Respuesta } from "../entidad/respuesta";

export interface CuentaRepositorio {
    crearCuenta(newCuenta: ICuentaSchema): Promise<Respuesta>;
    transferencia(newTransferencia: ITransferenciaSchema): Promise<Respuesta>;
    empresaTransferenciaUltimoMes(mesActual: Date, ultimoMes: Date): Promise<Respuesta>;
}