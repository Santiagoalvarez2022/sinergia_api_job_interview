const { Blog, Tag, Author, sequelize } = require('../../db/index');

module.exports = GetBlogsBy = async (author, tag, latest, pag, size) => {
    // latest = Boolean(latest)
    // return await Blog.findAll({
    //     order: latest ? [['createdAt', 'DESC']] : sequelize.random(),
    //     limit: size,
    //     offset: latest ? null : (pag - 1) * size,
    //     include: [
    //         { model: Author, attributes: ['id', 'nickname', 'image'], where: author ? { 'id': author } : {} },
    //         { model: Tag, attributes: ['id', 'name'], through: { attributes: [] }, where: tag ? { 'id': tag } : {} }
    //     ]
    // })

    return Blog.findAll({
        attributes: ['id', 'title', 'image'],
        include: [
            {
              model: Author,  // Incluir los datos del autor
              attributes: ['nickname'],  // Puedes incluir los campos que necesites del autor
            },
            {
              model: Tag,     // Si también quieres incluir las etiquetas asociadas al blog
              where: {
                name: tag,  // Aquí se hace la comparación con el nombre de la etiqueta
              },
            }
          ]
    })

}

/*

include: {
            model: Tag,
            where: {
              name: tag,  // Aquí se hace la comparación con el nombre de la etiqueta
            },
          },*/