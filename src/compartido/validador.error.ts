import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Response } from "express";
export class ValidadorError {
  public static async validate<T>(
    entidad: T,
    tipo: new () => T,
    res: Response
  ) {
    const instancia = plainToInstance(tipo, entidad);
    const errors = await validate(instancia as any);
    if (errors.length > 0) {
      res.status(400).json({
        error: "Datos no validos",
        detalles: errors.map((e) => ({
          propiedad: e.property,
          detalles: e.constraints,
        })),
      });
    }
  }
}
