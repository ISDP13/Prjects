import {blogCollection,postsCollection} from "../db/db";
import {UpdateResult} from "mongodb";

export type PostsDbType = {
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type PostsOutput = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

const postMap = (post: PostsDbType): PostsOutput => {
    return {
        id: post._id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const postsRepository = {


    async PostNewPost(NewPost: PostsDbType): Promise<PostsOutput> {
               await postsCollection.insertOne(NewPost)
               return postMap(NewPost)
    },

    async UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<void> {

        const blog = await blogCollection.findOne({_id: blogId})

         await postsCollection.updateOne({_id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog!.name
            }})
    },

    async DeletePostBuId(id: string): Promise<PostsDbType | undefined> {
       await postsCollection.deleteOne({_id: id})
        return
    },

}

