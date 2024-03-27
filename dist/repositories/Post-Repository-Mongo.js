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
exports.postsRepository = void 0;
const db_1 = require("../db/db");
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
exports.postsRepository = {
    PostNewPost(NewPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.insertOne(NewPost);
            return postMap(NewPost);
        });
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: blogId });
            yield db_1.postsCollection.updateOne({ _id: id }, {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                    blogName: blog.name
                }
            });
        });
    },
    DeletePostBuId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.deleteOne({ _id: id });
            return;
        });
    },
};
//# sourceMappingURL=Post-Repository-Mongo.js.map