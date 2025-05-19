import { Request, Response } from "express";
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { _empresa, AdhesionEmpresa } from "../../infrastructura/controllers/empresaController";
import { Respuesta } from "../../dominio/entidad/respuesta";
import { MockedFunction } from 'jest-mock';
jest.mock('../../aplicacion/empresa.service')
describe('Adhesion controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = {
            body: {
                razonSocial: 'Empresa Test',
                cuit: '20304050607'
            }
        }
        res = {
            status: statusMock,
            json: jsonMock

        } as unknown as Response;
    })
    it('devuelve 201 si la adhesion es exitosa', async () => {
        const respuesta: Respuesta = {
            mensaje: "Adhesion test OK",
            data: {
                razonSocial: "Empresa Test",
                cuit: "20304050607",
                fechaAdhesion: new Date().toISOString()
            }
        } as Respuesta;
        type Cuerpo = { razonSocial: string; cuit: string };
        const adhesionEmpresaMock = _empresa.AdhesionEmpresa as MockedFunction<(body: Cuerpo, res: Response) => Promise<Respuesta>>;
        adhesionEmpresaMock.mockResolvedValue(respuesta);
        await AdhesionEmpresa(req as Request, res as Response);
        expect(_empresa.AdhesionEmpresa).toHaveBeenCalledWith(req.body, res);
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(respuesta);
    })
    it('Si se produce un error devuelve 500', async () => {
        const errorMock = new Error('Error al adherir la empresa');
        type Cuerpo = { razonSocial: string; cuit: string };
        const adhesionEmpresaMock = _empresa.AdhesionEmpresa as MockedFunction<(body: Cuerpo, res: Response) => Promise<Respuesta>>;
        adhesionEmpresaMock.mockRejectedValue(errorMock);
        await AdhesionEmpresa(req as Request, res as Response);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: errorMock.message })
    })

})