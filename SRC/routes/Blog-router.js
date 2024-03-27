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
exports.blogsRouter = void 0;
var express_1 = require("express");
var AuthBlogsAndPosts_1 = require("../Auth/AuthBlogsAndPosts");
var Blog_Validation_1 = require("../Validation/Blog-Validation");
var Blog_service_1 = require("../domain/Blog-service");
var query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
var Post_Validation_1 = require("../Validation/Post-Validation");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sortedData, getAllBlogs;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                sortedData = {
                    searchNameTerm: (_a = req.query.searchNameTerm) !== null && _a !== void 0 ? _a : null,
                    sortBy: (_b = req.query.sortBy) !== null && _b !== void 0 ? _b : 'createdAt',
                    sortDirection: (_c = req.query.sortDirection) !== null && _c !== void 0 ? _c : "desc",
                    pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
                    pageSize: req.query.pageSize ? +req.query.pageSize : 10
                };
                return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogs(sortedData)];
            case 1:
                getAllBlogs = _d.sent();
                res.send(getAllBlogs);
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var FoundedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id)];
            case 1:
                FoundedBlog = _a.sent();
                if (!FoundedBlog) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(FoundedBlog);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.get('/:id/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sortedData, blog, foundedPost;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sortedData = {
                    pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
                    pageSize: req.query.pageSize ? +req.query.pageSize : 10,
                    sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
                    sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : 'desc',
                };
                return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id)];
            case 1:
                blog = _c.sent();
                if (!blog) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                if (!sortedData) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindPostsByBlogId(req.params.id, sortedData)];
            case 2:
                foundedPost = _c.sent();
                if (!foundedPost) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(foundedPost);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, Blog_Validation_1.BlogValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var NewBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Blog_service_1.blogsService.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
                // __Blogs.push(NewBlog)
            ];
            case 1:
                NewBlog = _a.sent();
                // __Blogs.push(NewBlog)
                res.status(201).send(NewBlog);
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.post('/:id/posts', AuthBlogsAndPosts_1.authMiddleware, (0, Post_Validation_1.createPostFromBlogValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var NewPostByBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Blog_service_1.blogsService.PostNewPostByBlog(req.body.title, req.body.shortDescription, req.body.content, req.params.id)];
            case 1:
                NewPostByBlog = _a.sent();
                if (!NewPostByBlog) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                res.status(201).send(NewPostByBlog);
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.put('/:id', AuthBlogsAndPosts_1.authMiddleware, (0, Blog_Validation_1.BlogValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id)];
            case 1:
                blog = _a.sent();
                if (!blog) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                return [4 /*yield*/, Blog_service_1.blogsService.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)];
            case 2:
                _a.sent();
                res.sendStatus(204);
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(req.params.id)];
            case 1:
                blog = _a.sent();
                if (!blog) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Blog_service_1.blogsService.DeleteBlogById(req.params.id)];
            case 2:
                _a.sent();
                res.sendStatus(204);
                return [2 /*return*/];
        }
    });
}); });
