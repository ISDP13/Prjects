"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = exports.BlogsRepository = void 0;
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
exports.BlogsRepository = {
    FindBlogsById(id) {
        let FindBlog = Blogs.find(b => b.id === id);
        return FindBlog;
    },
    PostNewBlog(name, description, websiteUrl) {
        const id = +new Date();
        const CreatedBlog = {
            id: id.toString(),
            name,
            description,
            websiteUrl
        };
        return CreatedBlog;
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        let FindBlog = Blogs.find(b => b.id === id);
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
        Blogs = Blogs.filter(b => b.id !== id);
        return Blogs;
    }
};
exports.PostsRepository = {
    FindPostsById(id) {
        let FindPost = Blogs.find(p => p.id === id);
        return FindPost;
    },
    PostNewPost(title, shortDescription, content, blogId) {
        const id = +new Date();
        const CreatedPost = {
            id: id.toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: ''
        };
        return CreatedPost;
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        let FindPost = Posts.find(p => p.id === id);
        if (FindPost) {
            FindPost.title = title,
                FindPost.shortDescription = shortDescription,
                FindPost.content = content,
                FindPost.blogId = blogId;
        }
        const UpdatedPost = {
            id: id,
            title,
            shortDescription,
            content,
            blogId,
            blogName: ''
        };
        return UpdatedPost;
    },
    DeletePostBuId(id) {
        Posts = Posts.filter(p => p.id !== id);
        return Posts;
    }
};
