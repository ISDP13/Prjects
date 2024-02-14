// BLOGS =============================
import {Blogs, Posts} from "../BlogsAndPosts";
import {BlogsRouter} from "../routes/BlogsAndPosts-router";

type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}


// POSTS ================================


export const BlogsRepository = {

    FindBlogsById(id: string) {
        let FindBlog = Blogs.find(b => b.id === id)
        return FindBlog
    },

    PostNewBlog(name: string, description: string, websiteUrl: string) {
        const id = new Date()
        const CreatedBlog = {
            id: id.toISOString(),
            name,
            description,
            websiteUrl
        }
        return CreatedBlog
    },

    UpdateBlogById(id: string, name: string, description: string, websiteUrl: string) {
        let FindBlog = Blogs.find(b => b.id === id)


        if (FindBlog) {
            FindBlog.name = name,
                FindBlog.description = description,
                FindBlog.websiteUrl = websiteUrl
        }
        const UpdatedBlog: BlogsType = {
            id: id,
            name,
            description,
            websiteUrl
        }
        return UpdatedBlog
    },

    DeleteBlogById(id: string) {
        //const targetVideos = Blogs.find(b => b.id === id)
        //Blogs.filter(v => v.id !== id);
       //
       // if (targetVideos) {
       //     return Blogs;
       // }
       //  Blogs = Blogs.filter(b => b.id !== id)
        const blogIndex = Blogs.findIndex(b => b.id === id)
        Blogs.splice(blogIndex,1)
    }
}

export const PostsRepository = {

    FindPostsById(id: string) {

        let FindPost = Posts.find(p => p.id === id)
        return FindPost
    },

    PostNewPost(title: string, shortDescription: string, content: string, blogId: string) {
        const id = new Date()
        const blog = BlogsRepository.FindBlogsById(blogId)
        const CreatedPost = {
            id: id.toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog!.name
        }
        return CreatedPost
    },

    UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string){
        let FindPost = Posts.find(p => p.id === id)
        const blogName = BlogsRepository.FindBlogsById(blogId)

        if (FindPost) {
            FindPost.title = title,
                FindPost.shortDescription = shortDescription,
                FindPost.content = content,
                FindPost.blogId = blogId,
                FindPost.blogName= blogName!.name

        }
        const PostIndex: number = Posts.findIndex(p => p.id == id)

        Posts.splice(PostIndex, 1, FindPost!)

        return
    },

    DeletePostBuId(id: string){
        const postIndex = Posts.findIndex(b => b.id === id)
        Posts.splice(postIndex,1)
    }

}