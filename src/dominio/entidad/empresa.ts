import { IsNotEmpty, IsString } from "class-validator";

export class Empresaentity {
  id: string;
  fechaAdhesion: Date;
  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsString()
  @IsNotEmpty()
  cuit: string;
  constructor() {
    this.id = "";
    this.fechaAdhesion = new Date();
    this.razonSocial = "";
    this.cuit = "";
  }
}
