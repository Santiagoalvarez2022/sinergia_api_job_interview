const { Blog, Tag, sequelize } = require('../../db/index');

module.exports = {
    updateBlog: async (dataBlog, listTags) => {
        const transaction = await sequelize.transaction();
        return await Blog.update({
            title: dataBlog.title,
            description: dataBlog.description,
            image: dataBlog.image,
        }, { where: { id: dataBlog.id }, returning: true, transaction })
            .then(async (thisBlog) => {
                listTags
                    ?
                    async () => {
                        const tags = Promise.all(listTags.map(async (tag) => {
                            await Tag.findByPk(tag, { transaction })
                        }))
                        await thisBlog.setTags(tags, { transaction });
                    }
                    : null
                await transaction.commit();
                return 'Blog actualizado correctamente!';
            }).catch(async (error) => {
                await transaction.rollback();
                throw new Error('No se pudo hacer el actualizado de datos del blog.', { cause: error });
            });
    }
}