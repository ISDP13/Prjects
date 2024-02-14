import {Request, Response, Router} from "express";
import {BlogsRepository, PostsRepository} from "../repositories/BlogsAndPosts-repository";
import {Blogs, ErrorType, Posts} from "../BlogsAndPosts";
import {body, validationResult} from "express-validator";
import {BlogValidation, PostsValidation} from "../Validation/BlogsAndPosts-Validation";
import {authMiddleware} from "../Auth/AuthBlogsAndPosts";



export const BlogsRouter = Router({})
export const PostsRouter = Router({})


// blogs ==================================================
BlogsRouter.get('/', (req: Request, res: Response) => {
    res.send(Blogs)

})

BlogsRouter.get('/:id', (req: Request, res: Response) => {
    let FoundedBlog = BlogsRepository.FindBlogsById(req.params.id)

    if (!FoundedBlog) {
         res.sendStatus(404)
     } else {
         res.status(200).send(FoundedBlog)
     }
})

BlogsRouter.post('/',authMiddleware,BlogValidation(),(req: Request, res: Response) => {

    let NewBlog = BlogsRepository.PostNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    Blogs.push(NewBlog)
    res.status(201).send(NewBlog)


})

BlogsRouter.put('/:id',authMiddleware, BlogValidation(), (req: Request, res: Response) => {
const blog = BlogsRepository.FindBlogsById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }

     let UpdatedBlog = BlogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

    const BlogIndex: number = Blogs.findIndex(b => b.id == req.params.id)

    Blogs.splice(BlogIndex, 1, UpdatedBlog)
    res.sendStatus(204)

})

BlogsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const blog = BlogsRepository.FindBlogsById(req.params.id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    BlogsRepository.DeleteBlogById(req.params.id)
    res.sendStatus(204)
})

// posts ==================================================

PostsRouter.get('/', (req: Request, res: Response) => {
    res.send(Posts)
})

PostsRouter.get('/:id', (req: Request, res: Response) => {

    let FoundedPosts = PostsRepository.FindPostsById(req.params.id)
    if (!FoundedPosts) {
        res.sendStatus(404)
    } else {
        res
            .status(200)
            .send(FoundedPosts)
    }
})

PostsRouter.post('/',authMiddleware, PostsValidation(), (req: Request, res: Response) => {


    let NewPost = PostsRepository.PostNewPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
        )

    Posts.push(NewPost)
    res.status(201).send(NewPost)

})

PostsRouter.put('/:id', authMiddleware, PostsValidation(), (req: Request, res: Response) => {
    const post = PostsRepository.FindPostsById(req.params.id)
    if (!post) return res.sendStatus(404)
     PostsRepository.UpdatePostById(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
    )
    res.sendStatus(204)
})

PostsRouter.delete('/:id',authMiddleware, (req: Request, res: Response) => {
    const post = PostsRepository.FindPostsById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    PostsRepository.DeletePostBuId(req.params.id)
    res.sendStatus(204)

})