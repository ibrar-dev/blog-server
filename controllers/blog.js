const Blog = require('../models/blog');

exports.postBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);

        if (!blog) {
            res.hasError = true;
            res.message = "Blog is not Created";
            next();
        }
        res.hasError = false;
        res.message = "Blog Successfuly created";
        next()
    }
    catch (err) {
        console.log('Error In Create Blog', err);
        res.hasError = true;
        res.message = "Blog is not Created";
        next();
    }
}

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blog = await Blog.fetchAll();
        if (!blog) {
            res.hasError = true;
            res.result = [];
            res.message = "Error in Blog Fatch";
            next();
        }
        res.hasError = false;
        res.result = blog;
        res.message = "Blog Successfuly Fetch";
        next()
    }
    catch (err) {
        console.log('Error In Create fetch', err);
        res.hasError = true;
        res.result = [];
        res.message = "Error in Blog Fatch";
        next();
    }
}

exports.getBlogById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const blog = await Blog.fetchById(id);
        if (!blog) {
            res.hasError = true;
            res.message = "Error in Blog Fatch";
            next();
        }
        res.hasError = false;
        res.result = blog;
        res.message = "Blog Successfuly Fetch";
        next()
    }
    catch (err) {
        console.log('Error In Create fetch', err);
        res.hasError = true;
        res.message = "Error in Blog Fatch";
        next();
    }
}

exports.deleteBlogById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteBlog = await Blog.deleteById(id)
        if (!deleteBlog) {
            res.hasError = true;
            res.message = "Error in blog delete";
        }
        res.hasError = false;
        res.message = "Blog Deleted Successfuly";
        next()
    }
    catch (err) {
        console.log('Error in blog delete', err);
        res.hasError = true;
        res.message = "Error in blog delete";
        next();
    }
}

exports.updateBlogById = async (req, res, next) => {
    try {

        const blog = await Blog.deleteById(req.body)
        if (!blog) {
            res.hasError = true;
            res.message = "Error in blog update";
        }
        res.hasError = false;
        res.result = blog;
        res.message = "Blog Update Successfuly";
        next()
    }
    catch (err) {
        console.log('Error in blog update delete', err);
        res.hasError = true;
        res.message = "Error in blog update";
        next();
    }
}