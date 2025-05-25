import { CuentaEntity } from "./cuenta";

export class TransferenciaEntity {
  cuentaOrigen?: CuentaEntity;
  cuentaDestino?: CuentaEntity;
  importe?: number;
  constructor() {
    this.cuentaDestino = undefined;
    this.cuentaOrigen = undefined;
    this.importe = 0;
  }
}
