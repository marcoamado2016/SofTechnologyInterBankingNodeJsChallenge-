import { beforeEach, describe } from "@jest/globals";
import { Respuesta } from "../../dominio/entidad/respuesta";
import { MockedFunction } from "jest-mock";
import {
  _empresa,
  UltimaAdhesionEmpresaController,
} from "../../infrastructura/controllers/empresaController";
import { Response } from "express";
import httpMocks from "node-mocks-http";
jest.mock("../../aplicacion/empresa.service");
describe("Adhesion empresa ultimo mes ", () => {
  let res: Partial<Response>;
  let req: httpMocks.MockRequest<any>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  beforeEach(() => {
    const mock = httpMocks.createMocks();
    req = mock.req;
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    } as unknown as Response;
  });
  it("adhesion ultima empresa ok", async () => {
    const respuesta: Respuesta = {
      mensaje: "Ultima empresa adherida test OK",
      data: {
        razonSocial: "Empresa Test",
        cuit: "20304050607",
        _id: "68294d7761f4fd0ca3906ee9",
        fechaAdhesion: "2025-04-01T03:00:00.000Z",
        createdAt: "2025-05-18T03:01:12.207Z",
        updatedAt: "2025-05-18T03:01:12.207Z",
      },
    } as Respuesta;
    const adhesionEmpresasUltimoMesMock =
      _empresa.UltimaAdhesionEmpresaService as MockedFunction<
        () => Promise<Respuesta>
      >;
    adhesionEmpresasUltimoMesMock.mockResolvedValue(respuesta);
    await UltimaAdhesionEmpresaController(req, res as Response);
    expect(_empresa.UltimaAdhesionEmpresaService).toHaveBeenCalledWith();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(respuesta);
  });
  it("adhesion ultima empresa error", async () => {
    const errorMock = new Error("Error adhesion ultima empresa");
    const adhesionEmpresasUltimoMesMock =
      _empresa.UltimaAdhesionEmpresaService as MockedFunction<
        () => Promise<Respuesta>
      >;
    adhesionEmpresasUltimoMesMock.mockRejectedValue(errorMock);
    await UltimaAdhesionEmpresaController(req, res as Response);
    expect(_empresa.UltimaAdhesionEmpresaService).toHaveBeenCalledWith();
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: errorMock.message });
  });
});
