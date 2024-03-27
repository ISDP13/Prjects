"use strict";
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
exports.blogsService = void 0;
const Blog_Repository_Mongo_1 = require("../repositories/Blog-Repository-Mongo");
const query_Blog_Repo_1 = require("../queryRepositories/query-Blog-Repo");
const Post_Repository_Mongo_1 = require("../repositories/Post-Repository-Mongo");
exports.blogsService = {
    PostNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let newBlog = {
                _id: crypto.randomUUID(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            return yield Blog_Repository_Mongo_1.BlogsRepository.PostNewBlog(newBlog);
            // return BlogsRepository.PostNewBlog(name, description, websiteUrl)
        });
    },
    PostNewPostByBlog(title, shortDescription, content, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_Blog_Repo_1.blogsQueryRepository.FindBlogsById(id);
            if (blog) {
                let newPost = {
                    _id: crypto.randomUUID(),
                    title,
                    shortDescription,
                    content,
                    blogId: id,
                    blogName: blog.name,
                    createdAt: new Date().toISOString()
                };
                return yield Post_Repository_Mongo_1.postsRepository.PostNewPost(newPost);
            }
            // return BlogsRepository.PostNewBlog(name, description, websiteUrl)
        });
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return Blog_Repository_Mongo_1.BlogsRepository.UpdateBlogById(id, name, description, websiteUrl);
            // return await blogCollection.updateOne({_id: id}, {
            //     $set: {
            //         name: name, description: description, websiteUrl: websiteUrl
            //     }
            // })
        });
    },
    DeleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Blog_Repository_Mongo_1.BlogsRepository.DeleteBlogById(id);
        });
    }
};
//# sourceMappingURL=Blog-service.js.map