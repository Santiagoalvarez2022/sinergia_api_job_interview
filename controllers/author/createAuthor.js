const { Author } = require('../../db/index');

module.exports = async (nickname, image) => {
    console.log(nickname, image);
    
    return await Author.create({ nickname, image })
        .then(async (a) => {
            console.log(a);

            return
        }).catch((error) => {
            throw new Error('no se pudo crear al Author.', { cause: error });
        });
}