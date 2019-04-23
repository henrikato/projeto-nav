import Repositorio from './../repositories/usuarioRepository';
import { generateToken } from './../services/authService';
import * as lodash from 'lodash';

//GetAll
export const GetAll = async (req, res) => {
    try {
        var retorno = await Repositorio.Get();
        res.status(200).send(retorno);
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const GetById = async (req, res) => {
    try {
        var retorno = await Repositorio.GetById(req.params.id);
        res.status(200).send(retorno);
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const Put = async (req, res) => {
    try {
        var retorno = await Repositorio.Put(req.params.id, req.body);
        res.status(200).send({ 
            message: "Usuário atualizado com sucesso!",
            retorno: lodash.merge(retorno, req.body)
        });
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const Post = async (req, res) => {
    try {
        await Repositorio.FindOne({}, '_id', async (err, retorno) => {
            if(err) throw new Error(err);

            var idAnterior = 0;
            if(retorno !== null){
                idAnterior = retorno._id;
            }

            req.body._id = ++idAnterior;
            await Repositorio.Post(req.body);
            res.status(200).json({
                message: "Usuário cadastrado com sucesso!"
            });
        })
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
}

export const Delete = async (req, res) => {
    try {
        await Repositorio.Delete(req.params.id);
        res.status(200).send({
            message: `Usuario #${req.params.id} excluído com sucesso.`
        });
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const Login = async (req, res) => {
    try {
        await Repositorio.FindOne({ "email": req.body.email, "senha": req.body.senha }, async (err, succ) => {
            if(err){
                res.status(401).send({
                    message: `Usuário não encontrado`,
                    erro: err.message
                });
                return;
            }
            if(!succ || succ === null){
                res.status(401).send({
                    message: `Usuário não encontrado`
                });
                return;
            }
            
            var token = await generateToken(req.body);
            res.status(200).send({
                id: succ._id,
                email: succ.email,
                token: token
            });
        });
    } catch (error) {
        res.status(500).send({
            message: `Houve um erro ao buscar o usuario`,
            erro: error.message
        });
    }
};