"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRouter = exports.BlogsRouter = void 0;
const express_1 = require("express");
const BlogsAndPosts_repository_1 = require("../repositories/BlogsAndPosts-repository");
const BlogsAndPosts_1 = require("../BlogsAndPosts");
const BlogsAndPosts_Validation_1 = require("../Validation/BlogsAndPosts-Validation");
const AuthBlogsAndPosts_1 = require("../Auth/AuthBlogsAndPosts");
exports.BlogsRouter = (0, express_1.Router)({});
exports.PostsRouter = (0, express_1.Router)({});
// blogs ==================================================
exports.BlogsRouter.get('/', (req, res) => {
    res.send(BlogsAndPosts_1.Blogs);
});
exports.BlogsRouter.get('/:id', (req, res) => {
    let FoundedBlog = BlogsAndPosts_repository_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!FoundedBlog) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(FoundedBlog);
    }
});
exports.BlogsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.BlogValidation)(), (req, res) => {
    let NewBlog = BlogsAndPosts_repository_1.BlogsRepository.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    BlogsAndPosts_1.Blogs.push(NewBlog);
    res.status(201).send(NewBlog);
});
exports.BlogsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.BlogValidation)(), (req, res) => {
    const blog = BlogsAndPosts_repository_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    let UpdatedBlog = BlogsAndPosts_repository_1.BlogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    const BlogIndex = BlogsAndPosts_1.Blogs.findIndex(b => b.id == req.params.id);
    BlogsAndPosts_1.Blogs.splice(BlogIndex, 1, UpdatedBlog);
    res.sendStatus(204);
});
exports.BlogsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => {
    const blog = BlogsAndPosts_repository_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    BlogsAndPosts_repository_1.BlogsRepository.DeleteBlogById(req.params.id);
    res.sendStatus(204);
});
// posts ==================================================
exports.PostsRouter.get('/', (req, res) => {
    res.send(BlogsAndPosts_1.Posts);
});
exports.PostsRouter.get('/:id', (req, res) => {
    let FoundedPosts = BlogsAndPosts_repository_1.PostsRepository.FindPostsById(req.params.id);
    if (!FoundedPosts) {
        res.sendStatus(404);
    }
    else {
        res
            .status(200)
            .send(FoundedPosts);
    }
});
exports.PostsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.PostsValidation)(), (req, res) => {
    let NewPost = BlogsAndPosts_repository_1.PostsRepository.PostNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    BlogsAndPosts_1.Posts.push(NewPost);
    res.status(201).send(NewPost);
});
exports.PostsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.PostsValidation)(), (req, res) => {
    const post = BlogsAndPosts_repository_1.PostsRepository.FindPostsById(req.params.id);
    if (!post)
        return res.sendStatus(404);
    BlogsAndPosts_repository_1.PostsRepository.UpdatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.sendStatus(204);
});
exports.PostsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => {
    const post = BlogsAndPosts_repository_1.PostsRepository.FindPostsById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    BlogsAndPosts_repository_1.PostsRepository.DeletePostBuId(req.params.id);
    res.sendStatus(204);
});
