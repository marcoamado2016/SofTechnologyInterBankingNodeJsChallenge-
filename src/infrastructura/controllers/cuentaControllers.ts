import { Request, Response } from "express";
import { CuentaService } from "../../aplicacion/cuenta.service";
import container from "../inversify";
import { Respuesta } from "../../dominio/entidad/respuesta";
import { CuentaEntity } from "../../dominio/entidad/cuenta";
import { TransferenciaEntity } from "../../dominio/entidad/transferencia";
import { HTTP_CODES } from "../../dominio/enum/http.codes";
export const _cuenta = container.get<CuentaService>(CuentaService);
export const Cuenta = async (req: Request, res: Response) => {
    try {
        const response: Respuesta = await _cuenta.crearCuenta(req.body as CuentaEntity, res);
        res.status(HTTP_CODES.CREATED).send(response);
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
    }
}
export const transferencia = async (req: Request, res: Response) => {
    const transferencia = req.body as TransferenciaEntity;
    const response: Respuesta = await _cuenta.transferencia(transferencia);
    res.status(HTTP_CODES.OK).send(response);
    try {
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message })
    }
}

export const empresaTransferenciaUltimoMes = async (res: Response) => {
    try {
        const response: Respuesta = await _cuenta.empresaTransferenciaUltimoMes()
        res.status(HTTP_CODES.OK).send(response);
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message })
    }
}