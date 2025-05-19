import { Respuesta } from "../../../dominio/entidad/respuesta";
import { CuentaRepositorio } from "../../../dominio/repositorio/cuenta.repositorio";
import Cuenta, { ICuentaSchema } from "../schema/cuentaModel";
import Transferencia, { ITransferenciaSchema } from "../schema/transferenciaModel";

export class CuentaMongoRepositorio implements CuentaRepositorio {
    async crearCuenta(newCuenta: ICuentaSchema): Promise<Respuesta> {
        try {
            const numeroCuenta = newCuenta.numeroCuenta;
            const cuentaEncontrada = await Cuenta.findOne({ numeroCuenta });
            if (cuentaEncontrada) throw new Error("La cuenta ya existe");
            const response = await newCuenta.save();
            return new Respuesta("Cuenta registrada ", response);
        } catch (error) {
            throw new Error(error as string);
        }

    }
    async transferencia(transferencia: ITransferenciaSchema): Promise<Respuesta> {
        try {
            const cuentaOrigen = await Cuenta.findOne({ numeroCuenta: transferencia.numeroCuentaOrigen })
            const cuentadestino = await Cuenta.findOne({ numeroCuenta: transferencia.numeroCuentaDestino })
            if (!cuentaOrigen) throw new Error("No existe la cuenta origen");
            if (!cuentadestino) throw new Error("No existe la cuenta destino")
            if (transferencia.importe > cuentaOrigen.saldo) throw new Error("Saldo de la cuenta origen es inferior al importe a transferir");
            cuentaOrigen.saldo = cuentaOrigen?.saldo - transferencia.importe;
            cuentadestino.saldo = cuentadestino?.saldo + transferencia.importe;
            await cuentadestino.save();
            await cuentaOrigen.save();
            transferencia.saldoActualOrigen = cuentaOrigen.saldo;
            transferencia.saldoActualDestino = cuentadestino.saldo;
            transferencia.save()
            return new Respuesta("transferencia OK", { cuentaOrigen: cuentaOrigen, cuentaDestino: cuentadestino });
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async empresaTransferenciaUltimoMes(mesActual: Date, ultimoMes: Date): Promise<Respuesta> {

        try {
            const transferenciaAdheridasUltimoMes: any[] = await Transferencia.find({
                fechaTransferencia: {
                    $gte: ultimoMes,
                    $lt: mesActual
                }
            });
            return new Respuesta("Transferencia ultimo mes", transferenciaAdheridasUltimoMes);
        } catch (error) {
            throw new Error(error as string);
        }
    }
}