const { Tag } = require('../../db/index');

module.exports = async (name) => {
    return await Tag.create({ name })
        .then(() => {
            return
        }).catch((error) => {
            throw new Error('no se pudo crear el tag.', { cause: error });
        });
}