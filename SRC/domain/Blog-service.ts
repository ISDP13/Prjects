
import {BlogsDbType, BlogsOutput, BlogsRepository} from '../repositories/Blog-Repository-Mongo'
import {DeleteResult, UpdateResult} from "mongodb";
import {blogsQueryRepository, Pagination} from "../queryRepositories/query-Blog-Repo";
import {CreatePostFromBlog} from "../routes/Blog-router";
import {PostsDbType, postsRepository} from "../repositories/Post-Repository-Mongo";
import {PostsOutput} from "../queryRepositories/query-Post-Repo";


export const blogsService = {


    async PostNewBlog(name: string, description: string, websiteUrl: string): Promise<BlogsOutput> {
        let newBlog = {
            _id: crypto.randomUUID(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const xxx = await BlogsRepository.PostNewBlog(newBlog)

        return xxx


        // return BlogsRepository.PostNewBlog(name, description, websiteUrl)

    },

    async PostNewPostByBlog(title: string, shortDescription: string, content: string, id: string): Promise<PostsOutput | null | undefined> {
        const blog = await blogsQueryRepository.FindBlogsById(id)
        if (blog) {
            let newPost: PostsDbType = {
                _id: crypto.randomUUID(),
                title,
                shortDescription,
                content,
                blogId: id,
                blogName: blog!.name,
                createdAt: new Date().toISOString()
            }
            return await postsRepository.PostNewPost(newPost)
        }


        // return BlogsRepository.PostNewBlog(name, description, websiteUrl)

    },

    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<UpdateResult<BlogsDbType>> {

       return BlogsRepository.UpdateBlogById(id, name, description, websiteUrl)
        // return await blogCollection.updateOne({_id: id}, {
        //     $set: {
        //         name: name, description: description, websiteUrl: websiteUrl
        //     }
        // })
    },

    async DeleteBlogById(id: string): Promise<DeleteResult> {
        return await BlogsRepository.DeleteBlogById(id)
    }
}
