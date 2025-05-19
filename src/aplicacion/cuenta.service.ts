import { inject, injectable } from "inversify";
import { CuentaRepositorio } from "../dominio/repositorio/cuenta.repositorio";
import { TYPES } from "../compartido/types";
import { Respuesta } from "../dominio/entidad/respuesta";
import { CuentaEntity } from "../dominio/entidad/cuenta";
import { Response } from "express";
import Cuenta, { ICuentaSchema } from "../infrastructura/repositorio/schema/cuentaModel";
import { ValidadorError } from "../compartido/validador.error";
import { TransferenciaEntity } from "../dominio/entidad/transferencia";
import Transferencia, { ITransferenciaSchema } from "../infrastructura/repositorio/schema/transferenciaModel";
import { mesActualYUltimo } from "../compartido/fechas";

@injectable()
export class CuentaService {
    constructor(@inject(TYPES.CuentaRepositorio) private cuentaRepositorio: CuentaRepositorio) { }
    async crearCuenta(cuenta: CuentaEntity, res: Response): Promise<Respuesta> {
        ValidadorError.validate(cuenta, CuentaEntity, res);
        const { idEmpresa, numeroCuenta, saldo } = cuenta;
        const newCuenta: ICuentaSchema = new Cuenta({
            idEmpresa, numeroCuenta, saldo
        })

        return await this.cuentaRepositorio.crearCuenta(newCuenta);
    }
    async transferencia(transferencia: TransferenciaEntity): Promise<Respuesta> {
        const { cuentaDestino, cuentaOrigen, importe } = transferencia;
        let fechaTransferencia = new Date();
        let idEmpresaOrigen = cuentaOrigen?.idEmpresa;
        let numeroCuentaOrigen = cuentaOrigen?.numeroCuenta;
        let saldoActualOrigen = cuentaOrigen?.saldo;
        let idEmpresaDestino = cuentaDestino?.idEmpresa;
        let numeroCuentaDestino = cuentaDestino?.numeroCuenta;
        let saldoActualDestino = cuentaDestino?.saldo;
        const newTransferencia: ITransferenciaSchema = new Transferencia({
            fechaTransferencia, importe, idEmpresaOrigen, numeroCuentaOrigen, saldoActualOrigen, idEmpresaDestino, numeroCuentaDestino, saldoActualDestino
        }
        )

        return await this.cuentaRepositorio.transferencia(newTransferencia);
    }
    async empresaTransferenciaUltimoMes(): Promise<Respuesta> {
        const { mesActual, ultimoMes } = mesActualYUltimo();
        return await this.cuentaRepositorio.empresaTransferenciaUltimoMes(mesActual, ultimoMes)
    }


}