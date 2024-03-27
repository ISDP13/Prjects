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
exports.blogsRouter = void 0;
const express_1 = require("express");
const AuthBlogsAndPosts_1 = require("../Middleware/AuthBlogsAndPosts");
const Blog_Validation_1 = require("../Validation/Blog-Validation");
const Blog_service_1 = require("../domain/Blog-service");
const query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
const Post_Validation_1 = require("../Validation/Post-Validation");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const sortedData = {
        searchNameTerm: (_a = req.query.searchNameTerm) !== null && _a !== void 0 ? _a : null,
        sortBy: (_b = req.query.sortBy) !== null && _b !== void 0 ? _b : 'createdAt',
        sortDirection: (_c = req.query.sortDirection) !== null && _c !== void 0 ? _c : "desc",
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10
    };
    const getAllBlogs = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogs(sortedData);
    res.send(getAllBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let FoundedBlog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id);
    if (!FoundedBlog) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(FoundedBlog);
    }
}));
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10,
        sortBy: (_d = req.query.sortBy) !== null && _d !== void 0 ? _d : 'createdAt',
        sortDirection: (_e = req.query.sortDirection) !== null && _e !== void 0 ? _e : 'desc',
    };
    const blog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    if (!sortedData) {
        res.sendStatus(404);
        return;
    }
    let foundedPost = yield query_Blog_Repo_1.blogsQueryRepository.FindPostsByBlogId(req.params.id, sortedData);
    if (!foundedPost) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(foundedPost);
    }
}));
exports.blogsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, Blog_Validation_1.BlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NewBlog = yield Blog_service_1.blogsService.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    // __Blogs.push(NewBlog)
    res.status(201).send(NewBlog);
}));
exports.blogsRouter.post('/:id/posts', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.createPostFromBlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NewPostByBlog = yield Blog_service_1.blogsService.PostNewPostByBlog(req.body.title, req.body.shortDescription, req.body.content, req.params.id);
    if (!NewPostByBlog) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(NewPostByBlog);
}));
exports.blogsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, Blog_Validation_1.BlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id);
    if (!blog) {
        return res.sendStatus(404);
    }
    yield Blog_service_1.blogsService.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    res.sendStatus(204);
}));
exports.blogsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    yield Blog_service_1.blogsService.DeleteBlogById(req.params.id);
    res.sendStatus(204);
}));
//# sourceMappingURL=Blog-router.js.map