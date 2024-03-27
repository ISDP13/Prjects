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
exports.usersRouter = void 0;
const express_1 = require("express");
const query_Users_Repo_1 = require("../queryRepositories/query-Users-Repo");
const User_service_1 = require("../domain/User-service");
const User_Validation_1 = require("../Validation/User-Validation");
const AuthBlogsAndPosts_1 = require("../Middleware/AuthBlogsAndPosts");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get('/', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const sortedData = {
        sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
        sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : "desc",
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10,
        searchLoginTerm: (_c = req.query.searchLoginTerm) !== null && _c !== void 0 ? _c : null,
        searchEmailTerm: (_d = req.query.searchEmailTerm) !== null && _d !== void 0 ? _d : null
    };
    const getAllUsers = yield query_Users_Repo_1.usersQueryRepository.findUsers(sortedData);
    res.send(getAllUsers);
}));
exports.usersRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, User_Validation_1.userValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = yield User_service_1.userService.postNewUserByAdmin(req.body.login, req.body.password, req.body.email);
    return res.status(201).send(newUser);
}));
exports.usersRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_Users_Repo_1.usersQueryRepository.findUserById(req.params.id);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    yield User_service_1.userService.deleteUserById(req.params.id);
    res.sendStatus(204);
}));
//# sourceMappingURL=User-router.js.map