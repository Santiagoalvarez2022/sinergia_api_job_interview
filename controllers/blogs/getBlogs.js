const { Blog } = require('../../db/index');

// Controller to retrieve blogs
const getBlogs = async (req, res) => {
  // Can get all blogs, a specific blog by ID, or blogs by an author
  try {
    const { author, id  } = req.query;
   
    if (author) {
      const blogs = await Blog.findAll({
        where: { author, approved : 'approved' }
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
       
        const blogs = await Blog.findAll({
          where: { approved : 'approved'}
        });
      return res.status(200).json(blogs);
    }

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
