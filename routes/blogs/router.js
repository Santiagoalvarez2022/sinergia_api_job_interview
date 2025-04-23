const express = require('express');
const router = express.Router();
const GetBlogsBy = require('../../controllers/blogs/getBlogs')
const postBlogs = require('../../controllers/blogs/postBlogs');
const { updateBlog } = require('../../controllers/blogs/updateBlog');
const getBlogById = require('../../controllers/blogs/getBlogById');
const getBlogs = require('../../controllers/blogs/getBlogs');
const verifyTokenAdmin = require('../../midlewares/verifyTokenAdmin');


//POST  - create news blogs
router.post('/', verifyTokenAdmin,postBlogs)

//GET - get all blogs or specific
router.get('/', getBlogs)

module.exports = router;