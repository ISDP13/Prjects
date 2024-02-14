// Middleware=======================================

import {body} from "express-validator";
import {BlogsRepository} from "../repositories/BlogsAndPosts-repository";
import {inputModelValidation} from "../inpuValidstion/inputValidationBlgsANDPsts";

const NameValidation = body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim().isLength({min: 1, max: 15})
    .withMessage('Name must no longer, then 15')

const DescriptionValidation = body('description')
    .isString()
    .withMessage('description must be a string')
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage('description must be around 500')

const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('websiteUrl must be a string')
    .trim()
    .isLength({min: 1, max: 100})
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage('websiteUrl must no longer, then 15')

export const BlogValidation = () => [NameValidation,DescriptionValidation,websiteUrlValidation,inputModelValidation]


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
    .custom((value) => {
        const blog = BlogsRepository.FindBlogsById(value)
        if (!blog) {
            throw Error("Incorrect blogId")
        }
        return true
    })
export const PostsValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, BlogIdValidation, inputModelValidation]
