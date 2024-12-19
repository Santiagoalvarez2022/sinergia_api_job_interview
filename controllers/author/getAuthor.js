const { Author, Blog, Tag } = require('../../db/index');

module.exports = {
    getAll: () => {
        return Author.findAll()
            .then((data) => {
                return data
            }).catch((error) => {
                throw new Error('no se pudo crear al Author.', { cause: error });
            });
    },
    getOne: (id) => {
        return Author.findByPk(id, {
            includes: [
                { model: Blog, includes: [{ model: Tag }] }
            ]
        }).then((authors) => {
            return authors
        }).catch((error) => {
            throw new Error('no se pudo acceder a los datos del author.', { cause: error });

        });
    }
}