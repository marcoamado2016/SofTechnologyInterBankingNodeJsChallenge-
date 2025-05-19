import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CuentaEntity {
    @IsString()
    @IsNotEmpty()
    numeroCuenta: string;
    @IsNumber()
    @IsNotEmpty()
    saldo: number;
    @IsString()
    @IsNotEmpty()
    idEmpresa: string;
    constructor() {
        this.numeroCuenta = ""
        this.saldo = 0;
        this.idEmpresa = "";
    }
}
