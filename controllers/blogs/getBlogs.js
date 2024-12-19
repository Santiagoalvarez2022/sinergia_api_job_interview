const { Blog, Tag, Author, sequelize } = require('../../db/index');

module.exports = GetBlogsBy = async (_author, _tag, _latest, _pag, _size) => {
    return Blog.findAll({
        order: _latest ? [['createdAt', 'DESC']] : sequelize.random(),
        limit: _size,
        offset: _latest ? null : (_pag - 1) * _size,
        include: [
            { model: Author, where: _author ? { 'nickname': _author } : {} },
            { model: Tag, where: _author ? { 'name': _tag } : {} }
        ]
    })



}