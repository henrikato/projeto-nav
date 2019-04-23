export default repositorioBase = (entidade) => {
    console.log(typeof(entidade))

    const entidade = {};
    entidade.prototype.get = async (query, fields, callback) => await entidade.find(query, fields, callback);
}