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
exports.postsQueryRepository = exports.postMap = void 0;
const db_1 = require("../db/db");
const query_Comm_Repo_1 = require("./query-Comm-Repo");
const postMap = (post) => {
    return {
        id: post._id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
};
exports.postMap = postMap;
exports.postsQueryRepository = {
    FindPosts(sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortDirection, sortBy, pageSize, pageNumber } = sortData;
            const posts = yield db_1.postsCollection
                .find()
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.postsCollection.countDocuments();
            const pagesCount = Math.ceil(totalCount / pageSize);
            return {
                pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: posts.map(exports.postMap)
            };
        });
    },
    FindPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.findOne({ _id: id });
            if (!post)
                return null;
            return (0, exports.postMap)(post);
        });
    },
    getCommentsByPostId(id, sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortDirection, sortBy, pageSize, pageNumber } = sortData;
            const comments = yield db_1.feedbackCollection
                .find({ postId: id })
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.feedbackCollection.countDocuments({ postId: id });
            const pagesCount = Math.ceil(totalCount / pageSize);
            return {
                pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: comments.map(query_Comm_Repo_1.feedbackMap)
            };
        });
    }
};
//# sourceMappingURL=query-Post-Repo.js.map