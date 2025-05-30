import { inject, injectable } from "inversify";
import { IEmpresaRepositorio } from "../dominio/repositorio/empresa.repositorio";
import { Empresaentity } from "../dominio/entidad/empresa";
import { Respuesta } from "../dominio/entidad/respuesta";
import Empresa, { IEmpresaSchema } from "../infrastructura/repositorio/schema/empresaModel";
import { mesActualYUltimo } from "../compartido/fechas";
import { TYPES } from "../compartido/types";
import { ValidadorError } from "../compartido/validador.error";
import { Response } from "express";

@injectable()
export class EmpresaService {

    constructor(@inject(TYPES.EmpresaRepositorio) private empresaRepositorio: IEmpresaRepositorio) { }
    async AdhesionEmpresaService(empresa: Empresaentity,res: Response): Promise<Respuesta> {
        ValidadorError.validate(empresa,Empresaentity,res);       
        const { razonSocial, cuit } = empresa;
        const newEmpresa: IEmpresaSchema = new Empresa({
            razonSocial, fechaAdhesion: new Date(), cuit
        })
        return await this.empresaRepositorio.adhesionEmpresaRepositorio(newEmpresa);
    }
    async AdhesionEmpresaUltimoMesService(): Promise<Respuesta> {
        const { mesActual, ultimoMes } = mesActualYUltimo();
        return await this.empresaRepositorio.AdhesionEmpresaultimoMesRepositorio(mesActual, ultimoMes);
    }
    async UltimaAdhesionEmpresaService(): Promise<Respuesta> {
        return await this.empresaRepositorio.UltimaAdhesionEmpresaRepositorio();
    }
}