import { Request, Response } from "express";
import container from "../inversify";
import { EmpresaService } from "../../aplicacion/empresa.service";
import { Empresaentity } from "../../dominio/entidad/empresa";
import { Respuesta } from "../../dominio/entidad/respuesta";
import { HTTP_CODES } from "../../dominio/enum/http.codes";
export const _empresa = container.get<EmpresaService>(EmpresaService);
export const AdhesionEmpresaController = async (
  req: Request,
  res: Response
) => {
  try {
    const response: Respuesta = await _empresa.AdhesionEmpresaService(
      req.body as Empresaentity,
      res
    );
    res.status(HTTP_CODES.CREATED).json(response);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};
export const AdhesionEmpresaUltimoMesController = async (
  req: Request,
  res: Response
) => {
  try {
    const response: Respuesta =
      await _empresa.AdhesionEmpresaUltimoMesService();
    res.status(HTTP_CODES.OK).send(response);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};

export const UltimaAdhesionEmpresaController = async (
  req: Request,
  res: Response
) => {
  try {
    const response: Respuesta = await _empresa.UltimaAdhesionEmpresaService();
    res.status(HTTP_CODES.OK).send(response);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};
