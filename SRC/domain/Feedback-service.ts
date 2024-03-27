import {feedbackRepository} from "../repositories/Feedback-Repository";


export const feedbackService = {

    async updateFeedback (content: string, id: string): Promise<any> {
        return await feedbackRepository.updateFeedbackById(content,id)
    },

    async deleteFeedbackById (id: string): Promise<any> {
        return await feedbackRepository.deleteFeedback(id)
    }

}