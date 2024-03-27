// Middleware=======================================

import {body} from "express-validator";
import {inputModelValidation} from "../inpuValidstion/inputValidationBlgsANDPsts";
import {BlogsRepository} from "../repositories/Blog-Repository-Mongo";
import {blogsQueryRepository} from "../queryRepositories/query-Blog-Repo";


const TitleValidation = body('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('title must no longer, then 15')

const ShortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage('ShortDescription must be a string')
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('ShortDescription must be around 500')

const ContentValidation = body('content')
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Content must no longer, then 1000')

const BlogIdValidation = body('blogId')
    .custom(async (value) => {
        const blog = await blogsQueryRepository.FindBlogsById(value)
        if (!blog) {
            throw Error("Incorrect blogId")
        }
        return true
    })


export const PostsValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, BlogIdValidation, inputModelValidation]
export const createPostFromBlogValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, inputModelValidation]
