import { Respuesta } from "../../../dominio/entidad/respuesta";
import { IEmpresaRepositorio } from "../../../dominio/repositorio/empresa.repositorio";
import Empresa, { IEmpresaSchema } from "../schema/empresaModel";

export class EmpresaMongoRepositorio implements IEmpresaRepositorio {
  async adhesionEmpresaRepositorio(
    newEmpresa: IEmpresaSchema
  ): Promise<Respuesta> {
    const cuit = newEmpresa.cuit;
    try {
      const empresaEncontrada = await Empresa.findOne({ cuit });
      if (empresaEncontrada) throw new Error("La empresa ya esta adherida");
      const response = await newEmpresa.save();
      return new Respuesta("Adhesion OK", response);
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async AdhesionEmpresaultimoMesRepositorio(
    mesActual: Date,
    ultimoMes: Date
  ): Promise<Respuesta> {
    try {
      const empresasAdheridasUltimoMes: any[] = await Empresa.find({
        fechaAdhesion: {
          $gte: ultimoMes,
          $lt: mesActual,
        },
      });
      return new Respuesta(
        "Empresas adhesion ultimo mes",
        empresasAdheridasUltimoMes
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async UltimaAdhesionEmpresaRepositorio(): Promise<Respuesta> {
    try {
      const ultimaEmpresaAdheridas: any = await Empresa.findOne().sort({
        fechaAdhesion: -1,
      });
      return new Respuesta("Ultima empresa adherida", ultimaEmpresaAdheridas);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
