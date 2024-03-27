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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRouter = void 0;
var express_1 = require("express");
var Post_Validation_1 = require("../Validation/Post-Validation");
var AuthBlogsAndPosts_1 = require("../Auth/AuthBlogsAndPosts");
var Posts_service_1 = require("../domain/Posts-service");
var query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
var query_Post_Repo_1 = require("../queryRepositories/query-Post-Repo");
var AuthUserMiddleware_1 = require("../Auth/AuthUserMiddleware");
var Feedback_Validation_1 = require("../Validation/Feedback-Validation");
exports.PostsRouter = (0, express_1.Router)({});
exports.PostsRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sortedData, getAllPosts;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sortedData = {
                    pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
                    pageSize: req.query.pageSize ? +req.query.pageSize : 10,
                    sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
                    sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : "desc",
                };
                return [4 /*yield*/, query_Post_Repo_1.postsQueryRepository.FindPosts(sortedData)];
            case 1:
                getAllPosts = _c.sent();
                res.send(getAllPosts);
                return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var FoundedPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Posts_service_1.postsService.FindPostsById(req.params.id)];
            case 1:
                FoundedPosts = _a.sent();
                if (!FoundedPosts) {
                    res.sendStatus(404);
                }
                else {
                    res
                        .status(200)
                        .send(FoundedPosts);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.PostsValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var NewPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Posts_service_1.postsService.PostNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)];
            case 1:
                NewPost = _a.sent();
                if (!NewPost) {
                    res.sendStatus(404);
                }
                else {
                    res
                        .status(201)
                        .send(NewPost);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.PostsValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Posts_service_1.postsService.FindPostsById(req.params.id)];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.body.blogId)];
            case 2:
                blogs = _a.sent();
                if (!(!post || !blogs)) return [3 /*break*/, 3];
                return [2 /*return*/, res.sendStatus(404)];
            case 3: return [4 /*yield*/, Posts_service_1.postsService.UpdatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)];
            case 4:
                _a.sent();
                res.sendStatus(204);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Posts_service_1.postsService.FindPostsById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!post) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Posts_service_1.postsService.DeletePostBuId(req.params.id)];
            case 2:
                _a.sent();
                res.sendStatus(204);
                return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.post('/:id/comments', AuthUserMiddleware_1.authUserMiddleware, Feedback_Validation_1.feedbackValidation, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newCommentByPost;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                return [4 /*yield*/, Posts_service_1.postsService.postNewCommentByPostId(req.params.id, req.body.content, token)];
            case 1:
                newCommentByPost = _b.sent();
                if (!newCommentByPost) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                res.status(201).send(newCommentByPost);
                return [2 /*return*/];
        }
    });
}); });
exports.PostsRouter.get('/:id/comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sortedData, post, getAllCommentsByPostId;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sortedData = {
                    pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
                    pageSize: req.query.pageSize ? +req.query.pageSize : 10,
                    sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
                    sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : "desc",
                };
                return [4 /*yield*/, query_Post_Repo_1.postsQueryRepository.FindPostsById(req.params.id)];
            case 1:
                post = _c.sent();
                if (!post) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                if (!sortedData) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, query_Post_Repo_1.postsQueryRepository.getCommentsByPostId(req.params.id, sortedData)];
            case 2:
                getAllCommentsByPostId = _c.sent();
                if (!getAllCommentsByPostId) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(getAllCommentsByPostId);
                }
                return [2 /*return*/];
        }
    });
}); });
