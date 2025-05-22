const { Blog, Tag} = require('../../db/index');

// Controller to handle blog post creation
const postBlogs = async (req, res) => {
    try {
        // Extract blog data from the request body
        const { title, image, text, design_type ,author, tags } = req.body;

        console.log('etiqueta que llega',tags);
        
        // Check for required fields
        if (!title || !image || !text || !design_type ||!author || !tags.length) {
            throw Error('Incomplete information');
        }
        // //find correct tag
        const tagsFound = [];

        for (let index = 0; index < tags.length; index++) {
            const {id} = tags[index];
            const findTag = await Tag.findByPk(id)
            if (!findTag) throw Error('The Tag does not exist');
            tagsFound.push(findTag)
        }
        console.log('Etiquetas encontradas ', tagsFound);
        

        // Create new blog post and add each tag
        const new_blog = await Blog.create({ title, image, text, design_type,author });
       
        for (let index = 0; index < tagsFound.length; index++) {
            let result =  await new_blog.addTags(tagsFound[index])
            console.log('creacion de registro en blogs_tags ', result);
            
        }
        
        console.log(new_blog);
        

        // Return success response with created blog
        res.status(201).json(new_blog);

    } catch (error) { 
        // Log the error for debugging
        console.error("Error creating blog:", error.message);

        // Generic server error
        res.status(400).json(error);
    }
};

module.exports = postBlogs;
