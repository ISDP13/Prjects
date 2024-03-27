"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllDataRouter = exports.PostsRouter = exports.BlogsRouter = void 0;
const express_1 = require("express");
const Blog_Repository_Mongo_1 = require("../repositories/Blog-Repository-Mongo");
const BlogsAndPosts_Validation_1 = require("../Validation/BlogsAndPosts-Validation");
const AuthBlogsAndPosts_1 = require("../Auth/AuthBlogsAndPosts");
const Post_Repository_Mongo_1 = require("../repositories/Post-Repository-Mongo");
const Delete_Data_Repository_Mongo_1 = require("../repositories/Delete-Data-Repository-Mongo");
exports.BlogsRouter = (0, express_1.Router)({});
exports.PostsRouter = (0, express_1.Router)({});
exports.DeleteAllDataRouter = (0, express_1.Router)({});
// blogs ==================================================
exports.BlogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBlogs = yield Blog_Repository_Mongo_1.BlogsRepository.FindBlogs();
    res.send(getAllBlogs);
}));
exports.BlogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let FoundedBlog = yield Blog_Repository_Mongo_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!FoundedBlog) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(FoundedBlog);
    }
}));
exports.BlogsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.BlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NewBlog = yield Blog_Repository_Mongo_1.BlogsRepository.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    // __Blogs.push(NewBlog)
    res.status(201).send(NewBlog);
}));
exports.BlogsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.BlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield Blog_Repository_Mongo_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!blog) {
        return res.sendStatus(404);
    }
    yield Blog_Repository_Mongo_1.BlogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    res.sendStatus(204);
}));
exports.BlogsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield Blog_Repository_Mongo_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    yield Blog_Repository_Mongo_1.BlogsRepository.DeleteBlogById(req.params.id);
    res.sendStatus(204);
}));
// posts ==================================================
exports.PostsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllPosts = yield Post_Repository_Mongo_1.PostsRepository.FindPosts();
    res.send(getAllPosts);
}));
exports.PostsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let FoundedPosts = yield Post_Repository_Mongo_1.PostsRepository.FindPostsById(req.params.id);
    if (!FoundedPosts) {
        res.sendStatus(404);
    }
    else {
        res
            .status(200)
            .send(FoundedPosts);
    }
}));
exports.PostsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.PostsValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NewPost = yield Post_Repository_Mongo_1.PostsRepository.PostNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!NewPost) {
        res.sendStatus(404);
    }
    else {
        res
            .status(201)
            .send(NewPost);
    }
    // res.status(201).send(NewPost)
}));
exports.PostsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, BlogsAndPosts_Validation_1.PostsValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_Repository_Mongo_1.PostsRepository.FindPostsById(req.params.id);
    const blogs = yield Blog_Repository_Mongo_1.BlogsRepository.FindBlogsById(req.body.blogId);
    if (!post || !blogs) {
        return res.sendStatus(404);
    }
    else {
        yield Post_Repository_Mongo_1.PostsRepository.UpdatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        res.sendStatus(204);
    }
}));
exports.PostsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_Repository_Mongo_1.PostsRepository.FindPostsById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    yield Post_Repository_Mongo_1.PostsRepository.DeletePostBuId(req.params.id);
    res.sendStatus(204);
}));
exports.DeleteAllDataRouter.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Delete_Data_Repository_Mongo_1.DeleteAllPosts.deleteAllData();
    res.sendStatus(204);
}));
//# sourceMappingURL=BlogsAndPosts-router.js.map