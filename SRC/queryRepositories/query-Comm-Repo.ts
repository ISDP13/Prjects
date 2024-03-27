import {feedbackCollection} from "../db/db";
import {feedbackRepository} from "../repositories/Feedback-Repository";

export type FeedbackDbType = {
    _id: string,
    content: string,
    postId: string,
    userId: string,
    commentatorInfo: [],
    createdAt: string
}

export type FeedbackOutputType = {
    id: string,
    content: string,
    commentatorInfo: [],
    createdAt: string
}

export const feedbackMap = (feedback: FeedbackDbType): FeedbackOutputType => {
    return {
        id: feedback._id,
        content: feedback.content,
        commentatorInfo: feedback.commentatorInfo,
        createdAt: feedback.createdAt
    }
}

export const feedbackQueryRepository = {

    async findFeedbackByIdForCheck(id:string){
       const comment = await feedbackCollection.findOne({_id:id})
       if(!comment) return null
       return comment.userId
    },

    async findFeedbackById(id:string):Promise<any> {
        const comment = await feedbackCollection.findOne({_id: id})
        if (!comment) return null
        return  feedbackMap(comment)
    }

}