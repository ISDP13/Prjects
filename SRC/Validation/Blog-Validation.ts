import {body} from "express-validator";
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



