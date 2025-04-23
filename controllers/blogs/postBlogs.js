const { Blog} = require('../../db/index');

// Controller to handle blog post creation
const postBlogs = async (req, res) => {
    try {
        // Extract blog data from the request body
        const { title, image, text, design_type ,author } = req.body;

        // Check for required fields
        if (!title || !image || !text || !design_type ||!author) {
            throw Error('Incomplete information');
        }

        // Create new blog post
        const new_blog = await Blog.create({ title, image, text, design_type,author }); 

        // Return success response with created blog
        res.status(201).json(new_blog);

    } catch (error) { 
        // Log the error for debugging
        console.error("Error creating blog:", error.message);

        // Return a 400 or 500 depending on the error
        if (error.message.includes('Incomplete information')) {
            return res.status(400).json({ 
                message: error.message 
            });
        }

        // Generic server error
        res.status(500).json({ 
            message: "Internal Server Error",
        });
    }
};

module.exports = postBlogs;
