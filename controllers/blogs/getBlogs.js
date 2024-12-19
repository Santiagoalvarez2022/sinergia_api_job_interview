const { Blog, Tag, Author, sequelize } = require('../../db/index');

module.exports = GetBlogsBy = async (author, tag, latest, pag, size) => {
    latest = Boolean(latest)
    return await Blog.findAll({
        order: latest ? [['createdAt', 'DESC']] : sequelize.random(),
        limit: size,
        offset: latest ? null : (pag - 1) * size,
        include: [
            { model: Author, attributes: ['id', 'nickname', 'image'], where: author ? { 'id': author } : {} },
            { model: Tag, attributes: ['id', 'name'], through: { attributes: [] }, where: tag ? { 'id': tag } : {} }
        ]
    })
}