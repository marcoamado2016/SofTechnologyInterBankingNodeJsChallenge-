import { ICuentaSchema } from "../../infrastructura/repositorio/schema/cuentaModel";
import { ITransferenciaSchema } from "../../infrastructura/repositorio/schema/transferenciaModel";
import { Respuesta } from "../entidad/respuesta";

export interface ICuentaRepositorio {
  crearCuentaBancariaRepositorio(newCuenta: ICuentaSchema): Promise<Respuesta>;
  transferenciaRepositorio(
    newTransferencia: ITransferenciaSchema
  ): Promise<Respuesta>;
  empresaTransferenciaUltimoMesRepositorio(
    mesActual: Date,
    ultimoMes: Date
  ): Promise<Respuesta>;
}
