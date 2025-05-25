import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggeerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DOcumentacion APIS de empresas, usuarios y transferencias",
      version: "1.0.0",
      description:
        "Documentación de endpoints para empresas, usuarios y transferencias",
    },
    servers: [
      {
        url: "http://localhost:8088",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Usuarios: {
          type: "object",
          properties: {
            usuario: { type: "string" },
            password: { type: "string" },
          },
          required: ["usuario", "password"],
        },
        Cuenta: {
          type: "object",
          properties: {
            numeroCuenta: { type: "string", example: "34646" },
            saldo: { type: "number", example: 23454 },
            idEmpresa: { type: "string", example: "22222" },
          },
          required: ["numeroCuenta", "saldo", "idEmpresa"],
        },
        Empresa: {
          type: "object",
          properties: {
            fechaAdhesion: { type: "string" },
            razonSocial: { type: "string" },
            cuit: { type: "string" },
          },
        },
        Transferencia: {
          type: "object",
          properties: {
            fechaTransferencia: { type: "string", format: "date-time" },
            importe: { type: "number" },
            idEmpresaOrigen: { type: "string" },
            numeroCuentaOrigen: { type: "string" },
            saldoActualOrigen: { type: "string" },
            idEmpresaDestino: { type: "string" },
            numeroCuentaDestino: { type: "string" },
            saldoActualDestino: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/interfaces/rutas/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggeerOptions);

export const configurarSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
