const express = require('express');
const router = express.Router();
const { getAll, getOne } = require('../../controllers/author/getAuthor')
const createAuthor = require('../../controllers/author/createAuthor')


router.get('/', async (req, res) => {
    const { authorId } = req.query;
    authorId
        ? await getOne(authorId)
            .then((authors) => {
                res.status(200).json({ authors })
            }).catch((error) => {
                res.status(400).json(error)
            })
        : await getAll()
            .then((authors) => {
                res.status(200).json({ authors })
            }).catch((error) => {
                res.status(400).json(error)
            });
})

router.post('/', async (req, res) => {
    const { nickname, image } = req.body;
    await createAuthor(nickname, image)
        .then(() => {
            res.status(200).json({})
        }).catch((error) => {
            res.status(400).json(error)
        });
})

module.exports = router;