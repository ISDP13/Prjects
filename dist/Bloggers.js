"use strict";
// Settings---------------------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const Bloggers_repository_1 = require("./repositories/Bloggers-repository");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const port = 3000;
exports.app.listen(port, () => {
    console.log('Server started...........' + port);
});
let Blogs = [
    {
        id: '1',
        name: "1",
        description: "1",
        websiteUrl: "1"
    }, {
        id: '2',
        name: "2",
        description: "2",
        websiteUrl: "2"
    }
];
let Posts = [
    {
        id: '1',
        title: '1',
        shortDescription: '1',
        content: '1',
        blogId: '1',
        blogName: '1'
    }, {
        id: '2',
        title: '2',
        shortDescription: '2',
        content: '2',
        blogId: '2',
        blogName: '2'
    }
];
// Business Process --------------------------------------------------------------------
// blogs ==================================================
exports.app.get('/blogs', (req, res) => {
    res.send(Blogs);
});
exports.app.get('/blogs/:id', (req, res) => {
    let FoundedBlog = Bloggers_repository_1.BlogsRepository.FindBlogsById(req.params.id);
    if (!FoundedBlog) {
        res.sendStatus(404);
    }
    else {
        res
            .status(200)
            .send(FoundedBlog);
    }
});
exports.app.post('/blogs', (req, res) => {
    let { name, description, websiteUrl } = req.body;
    const errors = {
        errorsMessages: []
    };
    let NewBlog = Bloggers_repository_1.BlogsRepository.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    if (!name || typeof name !== 'string' || !name.trim() || name.trim().length > 15 || name === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect name',
            field: 'name'
        });
    }
    if (!description || typeof description !== 'string' || !description.trim() || description.trim().length > 500 || description === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect description',
            field: 'description'
        });
    }
    // if (!websiteUrl || typeof websiteUrl !== 'string' || !websiteUrl.trim() || websiteUrl.trim().length > 100 || websiteUrl === 'undefind' || websiteUrl.match('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')) {
    //     errors.errorsMessages.push({
    //         message: 'Incorrect websiteUrl',
    //         field: websiteUrl
    //     })
    // }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    res.send(NewBlog);
    Blogs.push(NewBlog);
});
exports.app.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const errors = {
        errorsMessages: []
    };
    const FoundBlog = Blogs.find(b => b.id === id);
    if (!FoundBlog) {
        return res.sendStatus(404);
    }
    let { name, description, websiteUrl } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length > 15 || !name.trim() || name === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect name',
            field: 'name'
        });
    }
    if (!description || typeof description !== 'string' || description.trim().length > 500 || !description.trim() || description === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect name',
            field: 'description'
        });
    }
    // if (!websiteUrl || !websiteUrl.trim() || typeof websiteUrl !== 'string' || websiteUrl.trim().length > 500, websiteUrl === 'undefind') {
    //     errors.errorsMessages.push({
    //         message: 'Incorrect name',
    //         field: 'websiteUrl'
    //     })
    // }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    let UpdatedBlog = Bloggers_repository_1.BlogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    const BlogIndex = Blogs.findIndex(b => b.id == id);
    Blogs.splice(BlogIndex, 1, UpdatedBlog);
    res.sendStatus(204);
});
exports.app.delete('/blogs/:id', (req, res) => {
    let DeletedBlogs = Bloggers_repository_1.BlogsRepository.DeleteBlogById(req.params.id);
    if (!DeletedBlogs) {
        res.send(404);
    }
    else {
        res.sendStatus(204);
    }
    Blogs = DeletedBlogs;
    res.send(Blogs);
});
// posts ==================================================
exports.app.get('/posts', (req, res) => {
    res.send(Posts);
});
exports.app.get('/posts/:id', (req, res) => {
    let FoundedPosts = Bloggers_repository_1.PostsRepository.FindPostsById(req.params.id);
    if (!FoundedPosts) {
        res.sendStatus(404);
    }
    else {
        res
            .status(200)
            .send(FoundedPosts);
    }
});
exports.app.post('/posts', (req, res) => {
    let { title, shortDescription, content, blogId } = req.body;
    const errors = {
        errorsMessages: []
    };
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 30 || title === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (!shortDescription || typeof shortDescription !== 'string' || !shortDescription.trim() || shortDescription.trim().length > 100 || shortDescription === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect shortDescription',
            field: 'shortDescription'
        });
    }
    if (!content || typeof content !== 'string' || !content.trim() || content.trim().length > 1000 || content === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect content',
            field: 'content'
        });
    }
    if (!blogId || typeof blogId !== 'string' || !blogId.trim() || blogId.trim().length > 5 || blogId === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect blogId',
            field: 'blogId'
        });
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    let NewPost = Bloggers_repository_1.PostsRepository.PostNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.send(NewPost);
    Posts.push(NewPost);
});
exports.app.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const errors = {
        errorsMessages: []
    };
    const FoundPost = Posts.find(p => p.id === id);
    if (!FoundPost) {
        res.sendStatus(404);
    }
    let { title, shortDescription, content, blogId } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 30 || title === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (!shortDescription || typeof shortDescription !== 'string' || !shortDescription.trim() || shortDescription.trim().length > 100 || shortDescription === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect shortDescription',
            field: 'shortDescription'
        });
    }
    if (!content || typeof content !== 'string' || !content.trim() || content.trim().length > 1000 || content === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect content',
            field: 'content'
        });
    }
    if (!blogId || typeof blogId !== 'string' || !blogId.trim() || blogId.trim().length > 5 || blogId === 'undefind') {
        errors.errorsMessages.push({
            message: 'Incorrect blogId',
            field: 'blogId'
        });
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    let UpdatedPost = Bloggers_repository_1.PostsRepository.UpdatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    const PostIndex = Posts.findIndex(p => p.id == id);
    Posts.splice(PostIndex, 1, UpdatedPost);
    res.sendStatus(204);
});
exports.app.delete('/posts/:id', (req, res) => {
    let DeletedPost = Bloggers_repository_1.PostsRepository.DeletePostBuId(req.params.id);
    if (!DeletedPost) {
        res.send(404);
    }
    else {
        res.sendStatus(204);
    }
    Posts = DeletedPost;
    res.send(Posts);
    // let id = req.params.id
    // const FindPost = Posts.findIndex(b => b.id === id)
    // Posts = Posts.filter(p => p.id !== req.params.id)
    //
    // if (FindPost === -1) {
    //     res.send(404)
    //     return
    // } else {
    //     res.sendStatus(204)
    // }
});
// clear all =================================================
exports.app.delete('/testing/all-data', (req, res) => {
    Posts.length = 0;
    res.sendStatus(204);
});
