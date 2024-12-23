const express = require('express');
const router = express.Router();
const GetBlogsBy = require('../../controllers/blogs/getBlogs')
const postBlogs = require('../../controllers/blogs/postBlogs');
const { updateBlog } = require('../../controllers/blogs/updateBlog');
const getBlogById = require('../../controllers/blogs/getBlogById');

router.get('/', async (req, res) => {
    const { author, tag, latest, pag, size, id } = req.query

    if (id) {
        return getBlogById(id)
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            res.status(400).json({ message: 'no se pudo acceder a los Blogs con los parametros indicados', casue: error })
        });
    }
    return GetBlogsBy(author, tag, latest, pag, size)
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            res.status(400).json({ message: 'no se pudo acceder a los Blogs con los parametros indicados', casue: error })
        });
});

router.post('/', async (req, res) => {
    const { title, subtitle, description, image, authorId, tags } = req.body;
    await postBlogs({ title, subtitle, description, image, imageType, authorId, tags })
        .then(() => {
            res.status(201).json({})
        }).catch((error) => {
            res.status(400).json({ error })
        });
})

router.put('/', async (req, res) => {
    const { dataBlog, listTags } = req.body;
    await updateBlog(dataBlog, listTags)
        .then((result) => {
            res.status(201).json({ message: result })
        }).catch((error) => {
            res.status(400).json(error)
        });
})

module.exports = router;