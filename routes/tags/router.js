const express = require('express');
const router = express.Router();
const getTags = require('../../controllers/tags/getTags')
const createTag = require('../../controllers/tags/createTag')


router.get('/', async (_req, res) => {
    await getTags()
        .then((tags) => {
            res.status(200).json({ tags: tags })
        }).catch((error) => {
            res.status(400).json(error)
        });
})

router.post('/', async (req, res) => {
    const { name } = req.body;
    await createTag(name)
        .then(() => {
            res.status(200).json({})
        }).catch((error) => {
            res.status(400).json(error)
        });
})

module.exports = router;