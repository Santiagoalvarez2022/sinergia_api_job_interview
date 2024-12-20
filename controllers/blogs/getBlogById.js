const { Blog,Author} = require('../../db/index');

module.exports = GetBlogsBy = async (id) => {
    if(!id) throw Error('id is undefined')
    
    return await Blog.findByPk(id, {
        include: {
            model: Author, // Incluye el modelo Author en la consulta
            attributes: ['nickname'], // Solo devuelve el nombre del autor
        }})
}

