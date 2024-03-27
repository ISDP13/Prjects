import {blogCollection, feedbackCollection, postsCollection} from "../db/db";
import {UpdateResult} from "mongodb";
import {FeedbackDbType, feedbackMap, FeedbackOutputType} from "./query-Comm-Repo";

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
export type Pagination<I> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: I[]
}

export const postMap = (post: PostsDbType): PostsOutput => {
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

export const postsQueryRepository = {

    async FindPosts(sortData: any): Promise<Pagination<PostsOutput>> {
        const {sortDirection, sortBy, pageSize, pageNumber} = sortData

        const posts: PostsDbType[] = await postsCollection
            .find()
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: posts.map(postMap)
        }


    },

    async FindPostsById(id: string): Promise<PostsOutput | null> {
        const post: PostsDbType | null = await postsCollection.findOne({_id: id})
        if(!post) return null
        return postMap(post)
    },

    async getCommentsByPostId(id: string, sortData: any): Promise <Pagination<FeedbackOutputType>>{

        const {sortDirection, sortBy, pageSize, pageNumber} = sortData

        const comments: FeedbackDbType[] = await feedbackCollection
            .find({postId:id})
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()


        const totalCount = await feedbackCollection.countDocuments({postId:id})
        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: comments.map(feedbackMap)
        }

    }

}

