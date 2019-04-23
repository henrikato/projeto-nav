import { Schema, model } from 'mongoose';

const responsavel = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    usuario: {
        type: Number,
        ref: 'Usuario'
    },
    rg: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    endereco: {
        logradouro: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        complemento: {
            type: String
        },
        bairro:{
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
    }
    
}, { _id: false });

export default model("Responsavel", responsavel);