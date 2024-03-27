"use strict";
// Middleware=======================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostFromBlogValidation = exports.PostsValidation = void 0;
const express_validator_1 = require("express-validator");
const inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
const query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
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
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(value);
    if (!blog) {
        throw Error("Incorrect blogId");
    }
    return true;
}));
const PostsValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, BlogIdValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.PostsValidation = PostsValidation;
const createPostFromBlogValidation = () => [TitleValidation, ShortDescriptionValidation, ContentValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.createPostFromBlogValidation = createPostFromBlogValidation;
//# sourceMappingURL=Post-Validation.js.map