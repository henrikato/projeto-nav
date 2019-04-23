import Repositorio from '../repositories/responsavelRepository';
import * as lodash from 'lodash';

//GetAll
export const GetAll = async (req, res) => {
    try {
        var retorno = await Repositorio.Get();
        res.status(200).json(retorno);
    } catch (error) {
        res.status(500).json({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const GetById = async (req, res) => {
    try {
        var retorno = await Repositorio.GetById(req.params.id);
        res.status(200).json(retorno);
    } catch (error) {
        res.status(500).json({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};

export const Put = async (req, res) => {
    try {
        var persistido = await Repositorio.FindOne({ _id: req.params.id });
        if(persistido === null){
            res.status(422).json({
                mensagem: "Registro não encontrado"
            });
            return;
        }
        var atualizado = lodash.merge(persistido, req.body);
        var retorno = await Repositorio.Put(req.params.id, atualizado);
        res.status(200).json({ 
            message: "Responsável atualizado com sucesso!",
            retorno: lodash.merge(retorno, req.body)
        });
    } catch (error) {
        res.status(500).json({
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
                message: "Responsável cadastrado com sucesso!"
            });
        })
    } catch (error) {
        res.status(500).json({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
}

export const Delete = async (req, res) => {
    try {
        await Repositorio.Delete(req.params.id);
        res.status(200).json({
            message: `Responsável #${req.params.id} excluído com sucesso.`
        });
    } catch (error) {
        res.status(500).json({
            message: `Houve um erro ao processar sua requisição.`,
            erro: error.message
        })
    }
};
