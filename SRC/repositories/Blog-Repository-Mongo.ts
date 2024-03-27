import {blogCollection} from "../db/db";
import {DeleteResult, UpdateResult} from "mongodb";
import {blogsQueryRepository} from "../queryRepositories/query-Blog-Repo";

export type BlogsDbType = {
    _id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type BlogsOutput = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

const blogMap = (blog: BlogsDbType): BlogsOutput => {
    return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const BlogsRepository = {


    async PostNewBlog(newBlog: BlogsDbType): Promise<BlogsOutput> {
       await blogCollection.insertOne(newBlog)

        return blogMap(newBlog)

    },

    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<UpdateResult<BlogsDbType>> {

        return await blogCollection.updateOne({_id: id}, {
            $set: {
                name: name, description: description, websiteUrl: websiteUrl
            }
        })
    },

    async DeleteBlogById(id: string): Promise<DeleteResult> {
        return await blogCollection.deleteOne({_id: id})
    }
}

