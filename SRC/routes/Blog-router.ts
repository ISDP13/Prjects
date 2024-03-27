import {Request, Response, Router} from "express";
import {authMiddleware} from "../Middleware/AuthBlogsAndPosts";
import {BlogValidation} from "../Validation/Blog-Validation";
import {blogsService} from "../domain/Blog-service";
import {blogsQueryRepository} from "../queryRepositories/query-Blog-Repo";
import {createPostFromBlogValidation} from "../Validation/Post-Validation";

export const blogsRouter = Router({})

export type CreatePostFromBlog = {
    title: string,
    shortDescription: string,
    content: string
}


blogsRouter.get('/', async (req: Request, res: Response) => {
    const sortedData = {
        searchNameTerm: req.query.searchNameTerm ?? null,
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? "desc",
        pageNumber: req.query.pageNumber ? +req.query.pageNumber: 1,
        pageSize: req.query.pageSize ? +req.query.pageSize: 10
    }
    const getAllBlogs = await blogsQueryRepository.FindBlogs(sortedData)
    res.send(getAllBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    let FoundedBlog =  await blogsQueryRepository.FindBlogsById(req.params.id)

    if (!FoundedBlog) {
        res.sendStatus(404)
    } else {
        res.status(200).send(FoundedBlog)
    }
})

blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const sortedData = {
        pageNumber: req.query.pageNumber ? +req.query.pageNumber: 1,
        pageSize: req.query.pageSize ? +req.query.pageSize: 10,
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? 'desc',
    }
    const blog = await blogsQueryRepository.FindBlogsById(req.params.id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
     if(!sortedData){
         res.sendStatus(404)
         return
     }

    let foundedPost =  await blogsQueryRepository.FindPostsByBlogId(req.params.id, sortedData)

    if (!foundedPost) {
        res.sendStatus(404)
    } else {
        res.status(200).send(foundedPost)
    }
})

blogsRouter.post('/', authMiddleware, BlogValidation(), async (req: Request, res: Response) => {

    let NewBlog = await blogsService.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    // __Blogs.push(NewBlog)
    res.status(201).send(NewBlog)


})

blogsRouter.post('/:id/posts', authMiddleware, createPostFromBlogValidation(), async (req: Request, res: Response) => {


    let NewPostByBlog = await blogsService.PostNewPostByBlog(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
    if (!NewPostByBlog){
        res.sendStatus(404)
        return
    }

    res.status(201).send(NewPostByBlog)


})

blogsRouter.put('/:id', authMiddleware, BlogValidation(), async (req: Request, res: Response) => {
    const blog = await blogsQueryRepository.FindBlogsById(req.params.id)
    if (!blog) {
        return res.sendStatus(404)
        }

    await  blogsService.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

    res.sendStatus(204)

})

blogsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const blog =  await blogsQueryRepository.FindBlogsById(req.params.id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    await blogsService.DeleteBlogById(req.params.id)
    res.sendStatus(204)
})


