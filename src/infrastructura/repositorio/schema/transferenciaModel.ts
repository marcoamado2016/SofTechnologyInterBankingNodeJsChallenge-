import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ITransferencia {
    _id?: ObjectId | string | undefined;
    fechaTransferencia: Date;
    importe: number;
    idEmpresaOrigen: string;
    numeroCuentaOrigen: string;
    saldoActualOrigen: number;
    idEmpresaDestino: string;
    numeroCuentaDestino: string;
    saldoActualDestino: number;
}
export interface ITransferenciaSchema extends Document {
    _id: ObjectId | string | undefined;
    fechaTransferencia: Date;
    importe: number;
    idEmpresaOrigen: string;
    numeroCuentaOrigen: string;
    saldoActualOrigen: number;
    idEmpresaDestino: string;
    numeroCuentaDestino: string;
    saldoActualDestino: number;
}
const transferenciaSchema = new Schema(
    {
        fechaTransferencia: {
            type: Date,
            require: true
        },
        importe: {
            type: Number,
            require: true
        },
        idEmpresaOrigen: {
            type: String,
            require: true
        },
        numeroCuentaOrigen: {
            type: String,
            require: true
        },
        saldoActualOrigen: {
            type: Number,
            require: true
        },
        idEmpresaDestino: {
            type: String,
            require: true
        },
        numeroCuentaDestino: {
            type: String,
            require: true
        },
        saldoActualDestino: {
            type: Number,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Transferencia = mongoose.models.Transferencia || mongoose.model("Transferencia", transferenciaSchema)
export default Transferencia;