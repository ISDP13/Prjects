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
exports.blogsQueryRepository = void 0;
const db_1 = require("../db/db");
const query_Post_Repo_1 = require("./query-Post-Repo");
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
exports.blogsQueryRepository = {
    FindBlogs(sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortDirection, sortBy, pageSize, pageNumber, searchNameTerm } = sortData;
            let filter = {};
            if (searchNameTerm) {
                filter = {
                    name: {
                        $regex: searchNameTerm,
                        $options: 'i'
                    }
                };
            }
            const blogs = yield db_1.blogCollection
                .find(filter)
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.blogCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / pageSize);
            return {
                pageSize,
                page: pageNumber,
                pagesCount,
                totalCount,
                items: blogs.map(blogMap)
            };
        });
    },
    FindBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: id });
            if (!blog)
                return null;
            return blogMap(blog);
        });
    },
    FindPostsByBlogId(id, sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortDirection, sortBy, pageSize, pageNumber } = sortData;
            const posts = yield db_1.postsCollection
                .find({ blogId: id })
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.postsCollection.countDocuments({ blogId: id });
            const pagesCount = Math.ceil(totalCount / pageSize);
            return {
                pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: posts.map(query_Post_Repo_1.postMap)
            };
            // const blog: BlogsDbType | null =  await blogCollection.findOne({_id: id})
            // if (!blog) return null
            // return  blogMap(blog)
        });
    },
};
//# sourceMappingURL=query-Blog-Repo.js.map