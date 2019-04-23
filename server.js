import express from 'express';
import path from 'path';
import { urlencoded, json } from 'body-parser';
import { connect } from 'mongoose';
import appConfig from './public/src/appConfig';

const port = appConfig.portaApi || 3000;
const app = express();
const publicDir = path.join(__dirname,'public/assets');

connect("mongodb://localhost/nav", { useNewUrlParser: true });

app.use(urlencoded({ extended: true })).use(json());
app.use(express.static(publicDir))

import Usuario from './public/src/routes/usuarioRoute';
import Responsavel from './public/src/routes/responsavelRoute';
import { autorizacao } from './public/src/services/authService';
app.use('/api', Usuario);
app.use('/api', autorizacao, [ Responsavel ]);

app.listen(port, () => {
    console.log(`Aplicação online na porta ${port}.`)
})
