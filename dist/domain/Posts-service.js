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
exports.postsService = void 0;
const db_1 = require("../db/db");
const Post_Repository_Mongo_1 = require("../repositories/Post-Repository-Mongo");
const query_Post_Repo_1 = require("../queryRepositories/query-Post-Repo");
const Feedback_Repository_1 = require("../repositories/Feedback-Repository");
const query_Users_Repo_1 = require("../queryRepositories/query-Users-Repo");
exports.postsService = {
    FindPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield query_Post_Repo_1.postsQueryRepository.FindPostsById(id);
        });
    },
    PostNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: blogId });
            let NewPost = {
                _id: crypto.randomUUID(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            return yield Post_Repository_Mongo_1.postsRepository.PostNewPost(NewPost);
        });
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Post_Repository_Mongo_1.postsRepository.UpdatePostById(id, title, shortDescription, content, blogId);
        });
    },
    DeletePostBuId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_Repository_Mongo_1.postsRepository.DeletePostBuId(id);
        });
    },
    postNewCommentByPostId(id, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield query_Post_Repo_1.postsQueryRepository.FindPostsById(id);
            if (!post) {
                return null;
            }
            const user = yield query_Users_Repo_1.usersQueryRepository.findUserAccountById(userId);
            if (post) {
                let newComment = {
                    _id: crypto.randomUUID(),
                    content,
                    postId: post.id,
                    userId: user._id,
                    commentatorInfo: {
                        userId: user._id,
                        userLogin: user.accountData.login
                    },
                    createdAt: new Date().toISOString()
                };
                return yield Feedback_Repository_1.feedbackRepository.postNewFeedback(newComment);
            }
        });
    }
};
//# sourceMappingURL=Posts-service.js.map