import {Request, Response, Router} from "express";
import {BlogsRepository} from "../repositories/Blog-Repository-Mongo";
import {PostsValidation} from "../Validation/Post-Validation";
import {authMiddleware} from "../Middleware/AuthBlogsAndPosts";
import {postsService} from "../domain/Posts-service";
import {blogsQueryRepository} from "../queryRepositories/query-Blog-Repo";
import {postsQueryRepository} from "../queryRepositories/query-Post-Repo";
import {authUserMiddleware} from "../Middleware/AuthUserMiddleware";
import {feedbackService} from "../domain/Feedback-service";
import {contentValidation, feedbackValidation} from "../Validation/Feedback-Validation";
import {jwtService} from "../Application/JWT-service";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";



export const PostsRouter = Router({})


PostsRouter.get('/', async (req: Request, res: Response) => {
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber: 1,
        pageSize: req.query.pageSize ? +req.query.pageSize: 10,
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? "desc",
    }
    const getAllPosts = await postsQueryRepository.FindPosts(sortedData)
    res.send(getAllPosts)
})

PostsRouter.get('/:id', async (req: Request, res: Response) => {

    let FoundedPosts = await postsService.FindPostsById(req.params.id)
    if (!FoundedPosts) {
        res.sendStatus(404)
    } else {
        res
            .status(200)
            .send(FoundedPosts)
    }
})

PostsRouter.post('/', authMiddleware, PostsValidation(), async (req: Request, res: Response) => {

    let NewPost = await postsService.PostNewPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
    )

    if (!NewPost) {
        res.sendStatus(404)
    } else {
        res
            .status(201)
            .send(NewPost)
    }
    // res.status(201).send(NewPost)

})

PostsRouter.put('/:id', authMiddleware, PostsValidation(), async (req: Request, res: Response) => {
    const post = await postsService.FindPostsById(req.params.id)
    const blogs = await blogsQueryRepository.FindBlogsById(req.body.blogId)
    if (!post || !blogs){
        return res.sendStatus(404)} else {
    await postsService.UpdatePostById(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
    )
    res.sendStatus(204)}
})

PostsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const post = await postsService.FindPostsById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    await postsService.DeletePostBuId(req.params.id)
    res.sendStatus(204)

})

PostsRouter.post('/:id/comments',authUserMiddleware, feedbackValidation(),  async (req: Request, res: Response)=> {

    const userId = req.user!._id

    let newCommentByPost = await postsService.postNewCommentByPostId(req.params.id, req.body.content, userId)

    if (!newCommentByPost) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(newCommentByPost)

})

PostsRouter.get('/:id/comments', async (req: Request, res: Response) => {
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber: 1,
        pageSize: req.query.pageSize ? +req.query.pageSize: 10,
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? "desc",
    }

    const post = await postsQueryRepository.FindPostsById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    if(!sortedData){
        res.sendStatus(404)
        return
    }

    const getAllCommentsByPostId = await postsQueryRepository.getCommentsByPostId(req.params.id, sortedData)


    if (!getAllCommentsByPostId) {
        res.sendStatus(404)
    } else {
        res.status(200).send(getAllCommentsByPostId)
    }
})
