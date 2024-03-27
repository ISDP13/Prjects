"use strict";
// Settings---------------------------------------------------------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const Blog_router_1 = require("./routes/Blog-router");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db/db");
const Post_router_1 = require("./routes/Post-router");
const Delete_All_Data_router_1 = require("./routes/Delete-All-Data-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, body_parser_1.default)());
const port = 3000;
exports.app.use('/blogs', Blog_router_1.blogsRouter);
exports.app.use('/posts', Post_router_1.PostsRouter);
exports.app.use('/', Delete_All_Data_router_1.DeleteAllDataRouter);
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server started...........' + port);
    yield (0, db_1.runDb)();
}));
//# sourceMappingURL=Index-BlogsAndPosts.js.map