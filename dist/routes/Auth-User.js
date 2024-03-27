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
exports.authRouter = void 0;
const express_1 = require("express");
const User_service_1 = require("../domain/User-service");
const JWT_service_1 = require("../Application/JWT-service");
const query_Users_Repo_1 = require("../queryRepositories/query-Users-Repo");
const AuthUserMiddleware_1 = require("../Auth/AuthUserMiddleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_service_1.userService.checkCredential(req.body.loginOrEmail, req.body.password);
    if (!user)
        return res.sendStatus(401);
    const token = yield JWT_service_1.jwtService.createJWT(user);
    res.status(200).send({ accessToken: token });
}));
exports.authRouter.get('/me', AuthUserMiddleware_1.authUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_Users_Repo_1.usersQueryRepository.findUserById(req.user.id);
    if (!user)
        return res.sendStatus(404);
    res.status(200).send({
        email: user.email,
        login: user.login,
        userId: user.id
    });
}));
//# sourceMappingURL=Middleware-router.js.map