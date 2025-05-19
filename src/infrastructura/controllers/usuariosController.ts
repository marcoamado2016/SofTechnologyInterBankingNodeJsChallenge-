import { Request, Response } from "express";
import container from "../inversify";
import { UsuarioService } from "../../aplicacion/usuario.service";
import { UsuarioEntity } from "../../dominio/entidad/usuario";
import { HTTP_CODES } from "../../dominio/enum/http.codes";
const _usaurio = container.get<UsuarioService>(UsuarioService);
export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const respuesta = await _usaurio.crearUsaurio(req.body as UsuarioEntity);

        res.status(HTTP_CODES.CREATED).send(respuesta)
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message })
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const respuesta = await _usaurio.login(req.body as UsuarioEntity);

        res.status(HTTP_CODES.OK).send(respuesta)
    } catch (error: any) {
        res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message })
    }
}