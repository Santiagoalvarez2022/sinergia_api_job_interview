const express = require('express');
const { createBlog, getBlog } = require('../../controllers/blogs/blogs');
const router = express.Router();


//create blogs

router.post('/create', async(req,ser) =>{
    try {
        console.log('===> recibo en controller blog  ', req.body);
        
        const blog = await createBlog(req.body)

        console.log(blog, '=======================');

        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error:error.message})
    }      
})

router.get('/', async(req,ser) =>{
    try {
        console.log('===> recibo en controller blog  ', req.query);
        
        const blog = await getBlog( req.query.id)

        console.log(blog, '=======================');
        
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error:error.message})
    }      
})


module.exports = router;