import {blogCollection} from "../db/db";
import {UpdateResult} from "mongodb";
import {PostsDbType, PostsOutput, postsRepository} from "../repositories/Post-Repository-Mongo";
import {postsQueryRepository} from "../queryRepositories/query-Post-Repo";
import {jwtService} from "../Application/JWT-service";
import {feedbackRepository} from "../repositories/Feedback-Repository";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {FeedbackDbType} from "../queryRepositories/query-Comm-Repo";


export const postsService = {


    async FindPostsById(id: string): Promise<PostsOutput | null> {
        return await postsQueryRepository.FindPostsById(id)
    },

    async PostNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsOutput | undefined> {
        const blog = await blogCollection.findOne({_id: blogId})
        let NewPost = {
            _id: crypto.randomUUID(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }

        return await postsRepository.PostNewPost(NewPost)


    },

    async UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<void> {

        await postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)
    },

    async DeletePostBuId(id: string): Promise<PostsDbType | undefined> {
       return await postsRepository.DeletePostBuId(id)
    },

    async postNewCommentByPostId(id: string, content: string, userId: string): Promise<any> {

        const post = await postsQueryRepository.FindPostsById(id)

        if (!post) {return null}

        const user = await usersQueryRepository.findUserAccountById(userId)


        if (post) {
            let newComment = {
                _id: crypto.randomUUID(),
                content,
                postId:post.id,
                userId:user!._id,
                commentatorInfo: {
                    userId: user!._id,
                    userLogin: user!.accountData.login
                },
                createdAt: new Date().toISOString()
            }
            return await feedbackRepository.postNewFeedback(newComment)
        }
    }

}