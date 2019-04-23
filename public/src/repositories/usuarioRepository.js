import Usuario from './../app/models/Usuario';

/**
 * Método do Repositório que retorna uma lista com todos os Produtos cadastrados
 */
const Get = async (query, fields, callback) => await Usuario.find(query, fields, callback);

const FindOne = async(query, fields, callback) => await Usuario.findOne(query, fields, callback);

/**
 * Método do Repositório que retorna um Produto pelo seu ID
 * @param {Number} id ID do Produto a ser retornado.
 */
const GetById = async (id) => await Usuario.findById(id);

/**
 * Método do Repositório que atualiza um Produto
 * @param {Number} id ID do Produto a ser atualizado
 * @param {Object} data Objeto com propriedades do produto a ser atualizado
 */
const Put = async(id, data) => await Usuario.findByIdAndUpdate(id, { $set: data });

/**
 * Método do Repositório que inclui um Produto.
 * @param {Object} data Corpo JSON do Produto a ser persistido
 */
const Post = async (data) => {
    const entidade = new Usuario(data);
    await entidade.save();
}

/**
 * Método de Repositório que exclui um Produto pelo seu ID.
 * @param {Number} id ID do registro a ser excluído
 */
const Delete = async (id) => Usuario.findOneAndRemove(id);

export default { Get, GetById, Put, Post, Delete, FindOne };