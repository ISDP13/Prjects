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
    FindBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.__Blogs;
        });
    },
    FindBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.__Blogs.find(b => b.id === id);
        });
    },
    PostNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new Date();
            let newBlog = {
                id: id.toISOString(),
                name,
                description,
                websiteUrl
            };
            exports.__Blogs.push(newBlog);
            return newBlog;
        });
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let FindBlog = exports.__Blogs.find(b => b.id === id);
            if (FindBlog) {
                FindBlog.name = name;
                FindBlog.description = description;
                FindBlog.websiteUrl = websiteUrl;
            }
            const foundBlog = {
                id: id,
                name,
                description,
                websiteUrl
            };
            const BlogIndex = exports.__Blogs.findIndex(b => b.id == id);
            exports.__Blogs.splice(BlogIndex, 1, foundBlog);
            return;
        });
    },
    DeleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogIndex = exports.__Blogs.findIndex(b => b.id === id);
            exports.__Blogs.splice(blogIndex, 1);
            return;
        });
    }
};
// .name and  undefined | void | any
exports.PostsRepository = {
    FindPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.__Posts;
        });
    },
    FindPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.__Posts.find(p => p.id === id);
        });
    },
    PostNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new Date();
            const blog = yield exports.BlogsRepository.FindBlogsById(blogId);
            let NewPost = {
                id: id.toISOString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: 'blog!.name'
            };
            exports.__Posts.push(NewPost);
            return NewPost;
        });
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let FindPost = exports.__Posts.find(p => p.id === id);
            const blogName = yield exports.BlogsRepository.FindBlogsById(blogId);
            if (FindPost) {
                FindPost.title = title;
                FindPost.shortDescription = shortDescription;
                FindPost.content = content;
                FindPost.blogId = blogId;
                FindPost.blogName = blogName.name;
            }
            const PostIndex = exports.__Posts.findIndex(p => p.id == id);
            // Posts.splice(PostIndex, 1, FindPost!)
            exports.__Posts.splice(PostIndex, 1, FindPost);
            return;
        });
    },
    DeletePostBuId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postIndex = exports.__Posts.findIndex(b => b.id === id);
            exports.__Posts.splice(postIndex, 1);
            return;
        });
    },
};
exports.DeleteAllPosts = {
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            exports.__Posts.length = 0;
            exports.__Blogs.length = 0;
        });
    }
};
//# sourceMappingURL=BlogsAndPosts-repository.js.map