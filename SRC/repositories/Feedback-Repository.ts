
import {feedbackCollection} from "../db/db";
import {feedbackMap, feedbackQueryRepository} from "../queryRepositories/query-Comm-Repo";


export const feedbackRepository = {

    async postNewFeedback(newComment: any): Promise<any> {
        await feedbackCollection.insertOne(newComment)
        return feedbackMap(newComment)
    },

    async updateFeedbackById(content: string, id: string): Promise<any>  {

        const comment = await feedbackQueryRepository.findFeedbackById(id)

        if(!comment){
            return null
        }

        return await feedbackCollection.updateOne({_id:id}, {
            $set: {
                content: content
            }
        })
    },

    async deleteFeedback (id: string): Promise<any> {
        await feedbackCollection.deleteOne({_id: id})
    }

}