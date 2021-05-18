const express = require('express');
const router = express.Router();
const Blog = require('../controllers/blog')
const { baseResponse } = require('../utils/response')
const authentication = require('../middlewares/auth')


router.get("/", authentication.auth, Blog.getAllBlogs, baseResponse)

router.get("/:id", authentication.auth, Blog.getBlogById, baseResponse)

router.get("/delete/:id", authentication.auth, Blog.deleteBlogById, baseResponse)

router.post("/create", authentication.auth, Blog.postBlog, baseResponse)

router.post("/update", authentication.auth, Blog.updateBlogById, baseResponse)

module.exports = router;