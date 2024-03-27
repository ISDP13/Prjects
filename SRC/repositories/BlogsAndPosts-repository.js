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
exports.DeleteAllPosts = exports.PostsRepository = exports.BlogsRepository = exports.__Posts = exports.__Blogs = void 0;
exports.__Blogs = [
    {
        id: '2',
        name: "2",
        description: "2",
        websiteUrl: "2"
    }, {
        id: '3',
        name: "3",
        description: "3",
        websiteUrl: "3"
    }
];
exports.__Posts = [
    {
        id: '2',
        title: '2',
        shortDescription: '2',
        content: '2',
        blogId: '2',
        blogName: '2'
    }, {
        id: '3',
        title: '3',
        shortDescription: '3',
        content: '3',
        blogId: '3',
        blogName: '3'
    }
];
exports.BlogsRepository = {
    FindBlogs: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.__Blogs];
            });
        });
    },
    FindBlogsById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.__Blogs.find(function (b) { return b.id === id; })];
            });
        });
    },
    PostNewBlog: function (name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var id, newBlog;
            return __generator(this, function (_a) {
                id = new Date();
                newBlog = {
                    id: id.toISOString(),
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                };
                exports.__Blogs.push(newBlog);
                return [2 /*return*/, newBlog];
            });
        });
    },
    UpdateBlogById: function (id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var FindBlog, foundBlog, BlogIndex;
            return __generator(this, function (_a) {
                FindBlog = exports.__Blogs.find(function (b) { return b.id === id; });
                if (FindBlog) {
                    FindBlog.name = name;
                    FindBlog.description = description;
                    FindBlog.websiteUrl = websiteUrl;
                }
                foundBlog = {
                    id: id,
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                };
                BlogIndex = exports.__Blogs.findIndex(function (b) { return b.id == id; });
                exports.__Blogs.splice(BlogIndex, 1, foundBlog);
                return [2 /*return*/];
            });
        });
    },
    DeleteBlogById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var blogIndex;
            return __generator(this, function (_a) {
                blogIndex = exports.__Blogs.findIndex(function (b) { return b.id === id; });
                exports.__Blogs.splice(blogIndex, 1);
                return [2 /*return*/];
            });
        });
    }
};
// .name and  undefined | void | any
exports.PostsRepository = {
    FindPosts: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.__Posts];
            });
        });
    },
    FindPostsById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.__Posts.find(function (p) { return p.id === id; })];
            });
        });
    },
    PostNewPost: function (title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, blog, NewPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = new Date();
                        return [4 /*yield*/, exports.BlogsRepository.FindBlogsById(blogId)];
                    case 1:
                        blog = _a.sent();
                        NewPost = {
                            id: id.toISOString(),
                            title: title,
                            shortDescription: shortDescription,
                            content: content,
                            blogId: blogId,
                            blogName: 'blog!.name'
                        };
                        exports.__Posts.push(NewPost);
                        return [2 /*return*/, NewPost];
                }
            });
        });
    },
    UpdatePostById: function (id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function () {
            var FindPost, blogName, PostIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FindPost = exports.__Posts.find(function (p) { return p.id === id; });
                        return [4 /*yield*/, exports.BlogsRepository.FindBlogsById(blogId)];
                    case 1:
                        blogName = _a.sent();
                        if (FindPost) {
                            FindPost.title = title;
                            FindPost.shortDescription = shortDescription;
                            FindPost.content = content;
                            FindPost.blogId = blogId;
                            FindPost.blogName = blogName.name;
                        }
                        PostIndex = exports.__Posts.findIndex(function (p) { return p.id == id; });
                        // Posts.splice(PostIndex, 1, FindPost!)
                        exports.__Posts.splice(PostIndex, 1, FindPost);
                        return [2 /*return*/];
                }
            });
        });
    },
    DeletePostBuId: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var postIndex;
            return __generator(this, function (_a) {
                postIndex = exports.__Posts.findIndex(function (b) { return b.id === id; });
                exports.__Posts.splice(postIndex, 1);
                return [2 /*return*/];
            });
        });
    },
};
exports.DeleteAllPosts = {
    deleteAllData: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                exports.__Posts.length = 0;
                exports.__Blogs.length = 0;
                return [2 /*return*/];
            });
        });
    }
};
