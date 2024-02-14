"use strict";
// Middleware=======================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsValidation = exports.BlogValidation = void 0;
const express_validator_1 = require("express-validator");
const BlogsAndPosts_repository_1 = require("../repositories/BlogsAndPosts-repository");
const inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
const NameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('Name must be a string')
    .trim().isLength({ min: 1, max: 15 })
    .withMessage('Name must no longer, then 15');
const DescriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('description must be a string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('description must be around 500');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage('websiteUrl must no longer, then 15');
const BlogValidation = () => [NameValidation, DescriptionValidation, websiteUrlValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.BlogValidation = BlogValidation;
const TitleValidation = (0, express_validator_1.body)('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('title must no longer, then 15');
const ShortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .withMessage('ShortDescription must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('ShortDescription must be around 500');
const ContentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must no longer, then 1000');
const BlogIdValidation = (0, express_validator_1.body)('blogId')
    .custom((value) => {
    const blog = BlogsAndPosts_repository_1.BlogsRepository.FindBlogsById(value);
    if (!blog) {
        throw Error("Incorrect blogId");
    }
    return true;
});
const PostsValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, BlogIdValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.PostsValidation = PostsValidation;
