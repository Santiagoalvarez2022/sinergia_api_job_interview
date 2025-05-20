const { Blog, Tag, Blogs_tags } = require('../../db/index');

// Controller to retrieve blogs
const getBlogs = async (req, res) => {
  // Can get all blogs, a specific blog by ID, or blogs by an author
  console.log('ENTRE A LA RUTA DE GETBLOGS');
  
  try {
    const tags = await Tag.findAll({
      attributes: { exclude: ['deletedAt', 'updatedAt', 'createdAt'] },
    })

    const blogs = []

    for (let x = 0; x < tags.length; x++) {
      const {id, name} = tags[x];
      
      let blogsFound = await Blogs_tags.findAll(
       {
        where :{ tagId : id },
        include : {
          model : Blog, 
          where : {approved : 'approved'}
        }
      }
      )
      
      if (blogsFound.length) {

        if (blogsFound.length < 4) {
          //por efectos visuales de que el carrucel debe tener como minimo 4 elementos completo hasta un minimo de 4 el array de blogs recibidos
          let n = 4 - blogsFound.length
          let complete = Array(n).fill({empty: true, id:'s'})
          console.log(complete);
          
          blogsFound = [...blogsFound, ...complete]
        }
        
        let arrayByTag = {
          name,
          array : blogsFound,
        }
        blogs.push(arrayByTag)
      }
      
    }

    res.status(200).json(blogs)

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error getting blogs:", error.message);
    res.status(400).json({ 
      status: 400,
      error: error.message 
    });
  }
};

module.exports = getBlogs;
