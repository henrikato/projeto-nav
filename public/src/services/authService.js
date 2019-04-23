import appConfig from '../appConfig';
import { sign, verify } from 'jsonwebtoken';

// Gerar/codificar token
export const generateToken = async (data) => sign(data, appConfig.saltKey, { expiresIn: appConfig.expiracaoToken });

//Decodificar token
export const decodeToken = async (token) => await verify(token, appConfig.saltKey);

//Middleware de autenticação
export const autorizacao = (req, res, next) => {
    //Pega o token
    var token = req.headers["token"];

    if(!token){
        //Se o token não existe tira esse cara daqui
        res.status(401).json({ mensagem: "You shall not pass!", mensagemReal: "Acesso não autorizado." });
    } else {
        //Se o token existe pode passar
        verify(token, appConfig.saltKey, (err, succ) => {
            //O que esse cara tá fazendo aqui mano? Ele acha que é hacker?
            if(err){
                res.status(401).json({ mensagem: "Achou que ia passar? Achou errado otário!", mensagemReal: "Token inválido" });
            } else {
                next();
            }
        })
    }
}