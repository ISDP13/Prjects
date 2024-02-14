// Settings---------------------------------------------------------------

import express, {Request, Response} from 'express'
import {BlogsRouter, PostsRouter} from "./routes/BlogsAndPosts-router";
import bodyParser from "body-parser";

export const app = express()
app.use(express.json())
app.use(bodyParser())
const port = 3000
app.listen(port, () => {
    console.log('Server started...........' + port)
})
// Data-------------------------------------------------------------------
// blogs =================================
type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export let Blogs: BlogsType[] = [
    {
        id: '2',
        name: "2",
        description: "2",
        websiteUrl: "2"
    }, {
        id: '3',
        name: "3",
        description: "3",
        websiteUrl: "3"
    }]

// posts =================================
type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export let Posts: PostsType[] = [
    {
        id: '2',
        title: '2',
        shortDescription: '2',
        content: '2',
        blogId: '2',
        blogName: '2'
    }, {
        id: '3',
        title: '3',
        shortDescription: '3',
        content: '3',
        blogId: '3',
        blogName: '3'
    }]

// errors =============================
type ErrorsField = [{
    message: string
    field: string
}]

export type ErrorType= {
    errorsMessages: ErrorsField[]
}

// Business Process --------------------------------------------------------------------
app.use('/blogs', BlogsRouter)
app.use('/posts', PostsRouter)

// clear all =================================================

app.delete ('/testing/all-data', (req: Request, res: Response) => {
    Posts.length = 0;
    res.sendStatus(204);
})