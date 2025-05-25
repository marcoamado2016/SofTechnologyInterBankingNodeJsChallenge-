import { beforeEach, describe } from "@jest/globals";
import { Respuesta } from "../../dominio/entidad/respuesta";
import { MockedFunction } from "jest-mock";
import {
  _cuenta,
  empresaTransferenciaUltimoMesController,
} from "../../infrastructura/controllers/cuentaControllers";
import { Response } from "express";
import httpMocks from "node-mocks-http";
jest.mock("../../aplicacion/cuenta.service");
describe("transferencias ultimo mes", () => {
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
  it("transferencias ultimo mes OK", async () => {
    const respuesta: Respuesta = {
      mensaje: "Transferencia ultimo mes",
      data: [
        {
          _id: "682ae421e1b5e24396d56bd2",
          fechaTransferencia: "2025-04-19T07:56:17.961Z",
          importe: 500,
          idEmpresaOrigen: "1222",
          numeroCuentaOrigen: "1",
          saldoActualOrigen: 1500,
          idEmpresaDestino: "456",
          numeroCuentaDestino: "2",
          saldoActualDestino: 3000,
          createdAt: "2025-05-19T07:56:18.634Z",
          updatedAt: "2025-05-19T07:56:18.634Z",
        },
      ],
    };

    const transferenciaEmpresaUltimoMesMock =
      _cuenta.empresaTransferenciaUltimoMesService as MockedFunction<
        () => Promise<Respuesta>
      >;
    transferenciaEmpresaUltimoMesMock.mockResolvedValue(respuesta);
    await empresaTransferenciaUltimoMesController(req, res as Response);
    expect(_cuenta.empresaTransferenciaUltimoMesService).toHaveBeenCalledWith();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(respuesta);
  });
  it("transferencias ultimo mes Error", async () => {
    const errorMock = new Error("Error adhesion ultimo mes");
    const transferenciaEmpresaUltimoMesMock =
      _cuenta.empresaTransferenciaUltimoMesService as MockedFunction<
        () => Promise<Respuesta>
      >;
    transferenciaEmpresaUltimoMesMock.mockRejectedValue(errorMock);
    await empresaTransferenciaUltimoMesController(req, res as Response);
    expect(_cuenta.empresaTransferenciaUltimoMesService).toHaveBeenCalledWith();
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: errorMock.message });
  });
});
