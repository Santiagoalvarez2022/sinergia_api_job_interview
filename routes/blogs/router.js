const express = require('express');
const router = express.Router();
const GetBlogsBy = require('../../controllers/blogs/getBlogs')
const postBlogs = require('../../controllers/blogs/postBlogs');
const { updateBlog } = require('../../controllers/blogs/updateBlog');

router.get('/', async (req, res) => {
    const { author, tag, latest, pag, size } = req.query

    return GetBlogsBy(author, tag, latest, pag, size)
        .then((response) => res.status(200).json(response))
        .catch((err) => {
            res.status(400).json({ message: 'no se pudo acceder a los Blogs con los parametros indicados' })
        });
});

router.post('/', async (req, res) => {
    const { title, description, image, authorId, tags } = req.body;
    await postBlogs({ title, description, image, authorId, tags })
        .then(() => {
            res.status(201).json({})
        }).catch((error) => {
            res.status(400).json({ error })
        });
})

router.put('/', async (req, res) => {
    const { dataBlog, listTags } = req.body;
    console.log(req.body);
    
    await updateBlog(dataBlog, listTags)
        .then((result) => {
            res.status(201).json({ message: result })
        }).catch((error) => {
            res.status(400).json(error)
        });
})

module.exports = router;