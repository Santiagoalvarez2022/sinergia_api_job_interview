const {Blog} = require('../../db/index')

const createBlog = async (text, author, img, tags, reference) => {
    try {
        console.log('entre a crear blog',text, author, img, tags, reference);
        const newBlog = await Blog.create({text, author, img, tags, reference})
        
        return newBlog
    } catch (error) {
        throw new Error(error.message);
    }
    
};


const getBlog = async(id=false) =>{
    if (!id) {
        //enviar todos los blogs
        return await Blog.findAll()
    } 
    return await Blog.findByPk(id)    
}


module.exports = {
    createBlog,
    getBlog
}