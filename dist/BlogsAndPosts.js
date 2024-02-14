"use strict";
// Settings---------------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = exports.Blogs = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const BlogsAndPosts_router_1 = require("./routes/BlogsAndPosts-router");
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, body_parser_1.default)());
const port = 3000;
exports.app.listen(port, () => {
    console.log('Server started...........' + port);
});
exports.Blogs = [
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
exports.Posts = [
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
// Business Process --------------------------------------------------------------------
exports.app.use('/blogs', BlogsAndPosts_router_1.BlogsRouter);
exports.app.use('/posts', BlogsAndPosts_router_1.PostsRouter);
// clear all =================================================
exports.app.delete('/testing/all-data', (req, res) => {
    exports.Posts.length = 0;
    res.sendStatus(204);
});
