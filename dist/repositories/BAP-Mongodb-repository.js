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
exports.DeleteAllPosts = exports.PostsRepository = exports.BlogsRepository = void 0;
const db_1 = require("../db/db");
const blogMap = (blog) => {
    return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
const postMap = (post) => {
    return {
        id: post._id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
};
exports.BlogsRepository = {
    FindBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.blogCollection.find().toArray();
            return blogs.map(blogMap);
        });
    },
    FindBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: id });
            if (!blog)
                return null;
            return blogMap(blog);
        });
    },
    PostNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let newBlog = {
                _id: crypto.randomUUID(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            yield db_1.blogCollection.insertOne(newBlog);
            return blogMap(newBlog);
        });
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.updateOne({ _id: id }, {
                $set: {
                    name: name, description: description, websiteUrl: websiteUrl
                }
            });
        });
    },
    DeleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.deleteOne({ _id: id });
        });
    }
};
exports.PostsRepository = {
    FindPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield db_1.postsCollection.find().toArray();
            return posts.map(postMap);
        });
    },
    FindPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.findOne({ _id: id });
            if (!post)
                return null;
            return postMap(post);
        });
    },
    PostNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: blogId });
            let NewPost = {
                _id: crypto.randomUUID(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            yield db_1.postsCollection.insertOne(NewPost);
            return postMap(NewPost);
        });
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: blogId });
            return yield db_1.postsCollection.updateOne({ _id: id }, {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                    blogName: blog.name
                }
            });
        });
    },
    DeletePostBuId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.deleteOne({ _id: id });
            return;
        });
    },
};
exports.DeleteAllPosts = {
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.dropDatabase();
        });
    }
};
//# sourceMappingURL=BAP-Mongodb-repository.js.map