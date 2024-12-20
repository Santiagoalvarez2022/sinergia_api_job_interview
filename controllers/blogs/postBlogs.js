const { Blog, Author, Tag, sequelize } = require('../../db/index');

module.exports = postBlogs = async ({ title, description, image, imageType, authorId, tags }) => {
    
    
    
    
    const transaction = await sequelize.transaction()
    return await Blog.create({ title, description, image, imageType }, { transaction })
        .then(async (thisBlog) => {
            const thisAuthor = await Author.findByPk(authorId, { transaction })
            if (thisAuthor) {
                return { thisBlog, thisAuthor }
            } else {
                throw new Error('no hay ningun autor con el id especificado.');
            }
        }).then(async (prevData) => {
            const Tags = await Promise.all(tags.map(tagId => Tag.findByPk(tagId, { transaction })))
            if (Tags.includes(null) || Tags.includes(undefined)) {
                throw new Error('no se pudo encontrar uno de los id de tags solicitados');
            }
            return { ...prevData, Tags }
        }).then(async ({ thisBlog, thisAuthor, Tags }) => {
            await thisBlog.setAuthor(thisAuthor, { transaction })
            await thisBlog.addTags(Tags, { transaction })
            await transaction.commit()
            return
        }).catch(async (err) => {
            await transaction.rollback()
            throw new Error('no se pudo crear el Blog.', { cause: err });
        });
}