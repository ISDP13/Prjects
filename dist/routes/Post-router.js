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
exports.PostsRouter = void 0;
const express_1 = require("express");
const Post_Validation_1 = require("../Validation/Post-Validation");
const AuthBlogsAndPosts_1 = require("../Middleware/AuthBlogsAndPosts");
const Posts_service_1 = require("../domain/Posts-service");
const query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
const query_Post_Repo_1 = require("../queryRepositories/query-Post-Repo");
const AuthUserMiddleware_1 = require("../Middleware/AuthUserMiddleware");
const Feedback_Validation_1 = require("../Validation/Feedback-Validation");
exports.PostsRouter = (0, express_1.Router)({});
exports.PostsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10,
        sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
        sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : "desc",
    };
    const getAllPosts = yield query_Post_Repo_1.postsQueryRepository.FindPosts(sortedData);
    res.send(getAllPosts);
}));
exports.PostsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let FoundedPosts = yield Posts_service_1.postsService.FindPostsById(req.params.id);
    if (!FoundedPosts) {
        res.sendStatus(404);
    }
    else {
        res
            .status(200)
            .send(FoundedPosts);
    }
}));
exports.PostsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.PostsValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NewPost = yield Posts_service_1.postsService.PostNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
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
exports.PostsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.PostsValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Posts_service_1.postsService.FindPostsById(req.params.id);
    const blogs = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.body.blogId);
    if (!post || !blogs) {
        return res.sendStatus(404);
    }
    else {
        yield Posts_service_1.postsService.UpdatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        res.sendStatus(204);
    }
}));
exports.PostsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Posts_service_1.postsService.FindPostsById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    yield Posts_service_1.postsService.DeletePostBuId(req.params.id);
    res.sendStatus(204);
}));
exports.PostsRouter.post('/:id/comments', AuthUserMiddleware_1.authUserMiddleware, (0, Feedback_Validation_1.feedbackValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    let newCommentByPost = yield Posts_service_1.postsService.postNewCommentByPostId(req.params.id, req.body.content, userId);
    if (!newCommentByPost) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(newCommentByPost);
}));
exports.PostsRouter.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10,
        sortBy: (_c = req.query.sortBy) !== null && _c !== void 0 ? _c : 'createdAt',
        sortDirection: (_d = req.query.sortDirection) !== null && _d !== void 0 ? _d : "desc",
    };
    const post = yield query_Post_Repo_1.postsQueryRepository.FindPostsById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    if (!sortedData) {
        res.sendStatus(404);
        return;
    }
    const getAllCommentsByPostId = yield query_Post_Repo_1.postsQueryRepository.getCommentsByPostId(req.params.id, sortedData);
    if (!getAllCommentsByPostId) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(getAllCommentsByPostId);
    }
}));
//# sourceMappingURL=Post-router.js.map