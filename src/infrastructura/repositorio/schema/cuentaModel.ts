import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ICuenta {
    _id?: ObjectId | string | undefined;
    numeroCuenta?: string;
    saldo?: number;
    idEmpresa?: string;
}
export interface ICuentaSchema extends Document {
    _id: ObjectId | string | undefined;
    numeroCuenta?: string;
    saldo?: number;
    idEmpresa?: string;
}
const cuentaSchema = new Schema(
    {
        numeroCuenta: {
            type: String,
            require: true
        },
        saldo: {
            type: Number,
            require: true
        },
        idEmpresa: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Cuenta = mongoose.models.Cuenta || mongoose.model("Cuenta", cuentaSchema)
export default Cuenta;
