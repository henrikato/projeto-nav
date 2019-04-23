import { Schema, model } from 'mongoose';

const endereco = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: String,
    cep: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
}, { _id: false });

export default model("Endereco", endereco);