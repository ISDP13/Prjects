"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = exports.BlogsRepository = void 0;
// BLOGS =============================
const BlogsAndPosts_1 = require("../BlogsAndPosts");
// POSTS ================================
exports.BlogsRepository = {
    FindBlogsById(id) {
        let FindBlog = BlogsAndPosts_1.Blogs.find(b => b.id === id);
        return FindBlog;
    },
    PostNewBlog(name, description, websiteUrl) {
        const id = new Date();
        const CreatedBlog = {
            id: id.toISOString(),
            name,
            description,
            websiteUrl
        };
        return CreatedBlog;
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        let FindBlog = BlogsAndPosts_1.Blogs.find(b => b.id === id);
        if (FindBlog) {
            FindBlog.name = name,
                FindBlog.description = description,
                FindBlog.websiteUrl = websiteUrl;
        }
        const UpdatedBlog = {
            id: id,
            name,
            description,
            websiteUrl
        };
        return UpdatedBlog;
    },
    DeleteBlogById(id) {
        //const targetVideos = Blogs.find(b => b.id === id)
        //Blogs.filter(v => v.id !== id);
        //
        // if (targetVideos) {
        //     return Blogs;
        // }
        //  Blogs = Blogs.filter(b => b.id !== id)
        const blogIndex = BlogsAndPosts_1.Blogs.findIndex(b => b.id === id);
        BlogsAndPosts_1.Blogs.splice(blogIndex, 1);
    }
};
exports.PostsRepository = {
    FindPostsById(id) {
        let FindPost = BlogsAndPosts_1.Posts.find(p => p.id === id);
        return FindPost;
    },
    PostNewPost(title, shortDescription, content, blogId) {
        const id = new Date();
        const blog = exports.BlogsRepository.FindBlogsById(blogId);
        const CreatedPost = {
            id: id.toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name
        };
        return CreatedPost;
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        let FindPost = BlogsAndPosts_1.Posts.find(p => p.id === id);
        const blogName = exports.BlogsRepository.FindBlogsById(blogId);
        if (FindPost) {
            FindPost.title = title,
                FindPost.shortDescription = shortDescription,
                FindPost.content = content,
                FindPost.blogId = blogId,
                FindPost.blogName = blogName.name;
        }
        const PostIndex = BlogsAndPosts_1.Posts.findIndex(p => p.id == id);
        BlogsAndPosts_1.Posts.splice(PostIndex, 1, FindPost);
        return;
    },
    DeletePostBuId(id) {
        const postIndex = BlogsAndPosts_1.Posts.findIndex(b => b.id === id);
        BlogsAndPosts_1.Posts.splice(postIndex, 1);
    }
};
