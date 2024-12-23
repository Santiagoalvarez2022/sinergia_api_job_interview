const { Blog, Tag, sequelize } = require('../../db/index');

module.exports = {
    updateBlog: async (dataBlog, listTags) => {
        const transaction = await sequelize.transaction();
        return await Blog.findByPk(dataBlog.id, {
            include: [
                { model: Tag, attributes: ['id'] }
            ], transaction
        }).then(async (thisBlog) => {
            await thisBlog.update({
                title: dataBlog.title,
                subtitle: dataBlog.subtitle,
                description: dataBlog.description,
                image: dataBlog.image,
            }, { transaction })
            return thisBlog
        }).then(async (thisBlog) => {
            let tagToRemove = []
            thisBlog.tags.map(async (tag) => {
                listTags.includes(tag.id)
                    ? null
                    : tagToRemove.push(tag)
            })
            await thisBlog.removeTags(tagToRemove, { transaction })
            await thisBlog.addTags(listTags, { transaction })
            await transaction.commit();
            return 'Blog actualizado correctamente!';
        }).catch(async (error) => {
            await transaction.rollback();
            throw new Error('No se pudo hacer el actualizado de datos del blog.', { cause: error });
        });
    }
}