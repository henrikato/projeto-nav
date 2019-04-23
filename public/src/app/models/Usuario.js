import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    numeroTelefone: String
}, { _id: false });

export default model("Usuario", usuarioSchema);