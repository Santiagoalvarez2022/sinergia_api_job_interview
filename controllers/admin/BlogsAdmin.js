const { where } = require('sequelize');
const {Blog, Tag} = require('../../db/index.js')

const getBlogsAdmin = async(req,res) =>{
    try {
        const { author, id  } = req.query;
        if (author) {
            const blogs = await Blog.findAll({
              where: { author},
              include : Tag
            });
      
            return res.status(200).json(blogs);
          } 
          // If a blog ID is provided, return that specific blog
          else if (id) {
            const blog = await Blog.findByPk(id);
      
            // If no blog is found, return 404
            if (!blog) {
              return res.status(404).json({
                status: 404,
                message: `Blog with ID ${id} not found`
              });
            }
      
            return res.status(200).json(blog);
          } 
          // If no query is provided, return all blogs
          else {
            let blogs = await Blog.findAll({
                attributes: { exclude: ['deletedAt', 'updatedAt'] },
                include: [{
                  model: Tag,
                  exclude: ['deletedAt', 'updatedAt'],
                  attributes: ['id', 'name'], // columnas que querés del tag
                  through: { attributes: [] } // ← esto oculta blogs_tags
                }]
            });
            const tags = await Tag.findAll()           
            
            let num = 0;
            blogs = blogs.map(({createdAt, approved,design_type,author,id,image,title,text, tags})=>{
                let date = new Date(createdAt)
                date = date.toLocaleString(
                    'es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric', 
                    }
                )
                return  {
                    data : {design_type, image, text, id, tags},
                    data_show : {num : ++num, title, approved,  author, date, }
                }
            })


            return res.status(200).json({blogs,tags});
          }
    } catch (error) {
        res.status(400).json(error)
    }
} 




const updateStateBlog = async(req,res) =>{
  try {
    
    const {id} = req.params
    const {approved} = req.query

    const update = await Blog.update(
      {approved},
      {where:{id}}
    )
    if(!update) throw Error('Blog no encontrado')
   
    res.status(200).json(update)

  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getBlogsAdmin,
  updateStateBlog
};


/*
  [
    1
]


*/