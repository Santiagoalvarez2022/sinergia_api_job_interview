const { Blog,Author} = require('../../db/index');

module.exports = GetBlogsBy = async (req,res) => {
   try {
    const {id} = req.params
    console.log('============',req);
    

    if(!id) throw Error('id is undefined')

    const blog = await Blog.findByPk(id)

    if(!blog) throw Error('Articulo no encontrado');

    res.status(200).json(blog)

   } catch (error) {
    
    res.status(400).json(error)
   }
}
