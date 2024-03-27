import {Router, Request, Response} from "express";
import {authUserMiddleware} from "../Middleware/AuthUserMiddleware";
import {feedbackQueryRepository} from "../queryRepositories/query-Comm-Repo";
import {feedbackService} from "../domain/Feedback-service";
import {authMiddleware} from "../Middleware/AuthBlogsAndPosts";
import {feedbackValidation} from "../Validation/Feedback-Validation";
import {UserOutput, usersQueryRepository} from "../queryRepositories/query-Users-Repo";


export const feedbackRouter = Router({})


feedbackRouter.get('/:id',async (req: Request, res: Response )=> {

    const comment = await feedbackQueryRepository.findFeedbackById(req.params.id)

    if (!comment) {
        res.sendStatus(404)
        return
    }

    res.status(200).send(comment)
    return
})

feedbackRouter.put('/:id', authUserMiddleware, feedbackValidation(), async (req: Request, res: Response) => {


    const commentUserId = req.user!._id

    const user = await feedbackQueryRepository.findFeedbackByIdForCheck(req.params.id)

    if (!user) {
        res.sendStatus(404)
        return
    }

    if (commentUserId !== user) {
        res.sendStatus(403)
        return
    }


    const feedback = await feedbackService.updateFeedback(req.body.content, req.params.id)

    if (!feedback) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return
})

feedbackRouter.delete('/:id',authUserMiddleware,  async (req: Request, res: Response ) => {

    // здесь ищем айди юзера из хедера аутха
    const commentUserId = req.user!._id
    // здесь ищем айди юзера по комментариям оставленным
    const user = await feedbackQueryRepository.findFeedbackByIdForCheck(req.params.id)

    if (!user) {
        res.sendStatus(404)
        return 
    }

    console.log(user)
    if (commentUserId !== user) {
        res.sendStatus(403)
        return
    }

    const comment =  await feedbackQueryRepository.findFeedbackById(req.params.id)

    if (!comment) {
        res.sendStatus(404)
        return
    }
    await feedbackService.deleteFeedbackById(req.params.id)
    res.sendStatus(204)

})




