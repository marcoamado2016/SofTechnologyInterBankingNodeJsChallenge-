import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface IEmpresa {
    _id?: ObjectId | string | undefined;
    fechaAdhesion?: Date;
    razonSocial?: string
    cuit?: String;
}
export interface IEmpresaSchema extends Document {
    _id: ObjectId | string | undefined;
    fechaAdhesion?: Date;
    razonSocial?: string
    cuit: String;
}
const empresaSchema = new Schema(
    {
        fechaAdhesion: {
            type: Date,
            require: true
        },
        razonSocial: {
            type: String,
            require: true
        },
        cuit: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Empresa = mongoose.models.Empresa || mongoose.model("Empresa", empresaSchema)
export default Empresa;