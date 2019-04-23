import Responsavel from '../app/models/Responsavel';

/**
 * Método do Repositório que retorna uma lista com todos os Produtos cadastrados
 */
const Get = async (query, fields, callback) => await Responsavel.find(query, fields, callback).populate('usuario');

const FindOne = async(query, fields, callback) => await Responsavel.findOne(query, fields, callback);

/**
 * Método do Repositório que retorna um Produto pelo seu ID
 * @param {Number} id ID do Produto a ser retornado.
 */
const GetById = async (id) => await Responsavel.findById(id);

/**
 * Método do Repositório que atualiza um Produto
 * @param {Number} id ID do Produto a ser atualizado
 * @param {Object} data Objeto com propriedades do produto a ser atualizado
 */
const Put = async(id, data) => await Responsavel.findOneAndUpdate({ _id: Number(id) }, { $set: data });

/**
 * Método do Repositório que inclui um Produto.
 * @param {Object} data Corpo JSON do Produto a ser persistido
 */
const Post = async (data) => {
    const entidade = new Responsavel(data);
    await entidade.save();
}

/**
 * Método de Repositório que exclui um Produto pelo seu ID.
 * @param {Number} id ID do registro a ser excluído
 */
const Delete = async (id) => Responsavel.findOneAndRemove(id);

export default { Get, GetById, Put, Post, Delete, FindOne };