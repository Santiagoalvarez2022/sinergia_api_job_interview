const { Tag } = require('../../db/index');

module.exports = async () => {
    return await Tag.findAll()
        .then((tags) => {
            return tags
        }).catch((error) => {
            throw new Error('no se pudo solicitar los tags.', { cause: error });
        });
}