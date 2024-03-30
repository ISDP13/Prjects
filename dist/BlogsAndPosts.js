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
const User_router_1 = require("./routes/User-router");
const Auth_router_1 = require("./routes/Auth-router");
const feedback_router_1 = require("./routes/feedback-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Security_Device_router_1 = require("./routes/Security-Device_router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, body_parser_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.set('trust proxy', true);
const port = 3000;
exports.app.use('/blogs', Blog_router_1.blogsRouter);
exports.app.use('/posts', Post_router_1.PostsRouter);
exports.app.use('/auth', Auth_router_1.authRouter);
exports.app.use('/users', User_router_1.usersRouter);
exports.app.use('/comments', feedback_router_1.feedbackRouter);
exports.app.use('/security', Security_Device_router_1.securityDevicesRouter);
exports.app.use('/', Delete_All_Data_router_1.DeleteAllDataRouter);
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server started...........' + port);
    yield (0, db_1.runDb)();
}));
//# sourceMappingURL=BlogsAndPosts.js.map