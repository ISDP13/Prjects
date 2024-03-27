export const __Blogs: BlogsType[] = [
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
    }]
type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
export const __Posts: PostsType[] = [
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
    }]
type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export const BlogsRepository  = {

    async FindBlogs():Promise<BlogsType[]>{
        return __Blogs
    },

    async FindBlogsById(id: string): Promise<BlogsType | undefined> {
        return __Blogs.find(b => b.id === id)
    },

    async PostNewBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
        const id = new Date()
        let newBlog = {
            id: id.toISOString(),
            name,
            description,
            websiteUrl
        }
        __Blogs.push(newBlog)
        return newBlog

    },

    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<BlogsType | undefined > {
        let FindBlog = __Blogs.find(b => b.id === id)

        if (FindBlog) {
            FindBlog.name = name
            FindBlog.description = description
            FindBlog.websiteUrl = websiteUrl
        }

        const foundBlog = {
            id: id,
            name,
            description,
            websiteUrl
        }

        const BlogIndex: number =  __Blogs.findIndex(b => b.id == id)

        __Blogs.splice(BlogIndex, 1, foundBlog)
        return



    },

    async DeleteBlogById(id: string): Promise<BlogsType| undefined> {
        const blogIndex = __Blogs.findIndex(b => b.id === id)
        __Blogs.splice(blogIndex,1)
        return
    }
}

// .name and  undefined | void | any

export const PostsRepository = {

    async FindPosts():Promise<PostsType[]>{
        return __Posts
    },

    async FindPostsById(id: string): Promise<PostsType | undefined> {
        return __Posts.find(p => p.id === id)
    },

    async PostNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType> {
        const id = new Date()
        const blog = await BlogsRepository.FindBlogsById(blogId)
        let NewPost = {
            id: id.toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'blog!.name'
        }
        __Posts.push(NewPost)
        return NewPost

    },

    async UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | undefined>{
        let FindPost =  __Posts.find(p => p.id === id)
        const blogName =  await BlogsRepository.FindBlogsById(blogId)

        if (FindPost) {
            FindPost.title = title
            FindPost.shortDescription = shortDescription
            FindPost.content = content
            FindPost.blogId = blogId
            FindPost.blogName = blogName!.name

        }
        const PostIndex: number = __Posts.findIndex(p => p.id == id)

        // Posts.splice(PostIndex, 1, FindPost!)

        __Posts.splice(PostIndex, 1, FindPost!)
        return
    },

    async DeletePostBuId(id: string): Promise<PostsType | undefined>{
        const postIndex = __Posts.findIndex(b => b.id === id)
        __Posts.splice(postIndex,1)
        return
    },

}

export const DeleteAllPosts ={
    async deleteAllData(): Promise<PostsType | undefined | void | any>{
        __Posts.length = 0
        __Blogs.length = 0
    }

}
