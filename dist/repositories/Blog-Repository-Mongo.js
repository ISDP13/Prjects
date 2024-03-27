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
exports.BlogsRepository = void 0;
const db_1 = require("../db/db");
const blogMap = (blog) => {
    return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
exports.BlogsRepository = {
    PostNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.blogCollection.insertOne(newBlog);
            return blogMap(newBlog);
        });
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.updateOne({ _id: id }, {
                $set: {
                    name: name, description: description, websiteUrl: websiteUrl
                }
            });
        });
    },
    DeleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.deleteOne({ _id: id });
        });
    }
};
//# sourceMappingURL=Blog-Repository-Mongo.js.map