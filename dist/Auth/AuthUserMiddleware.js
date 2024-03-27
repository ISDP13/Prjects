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
exports.authUserMiddleware = void 0;
const JWT_service_1 = require("../Application/JWT-service");
const query_Users_Repo_1 = require("../queryRepositories/query-Users-Repo");
const authUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.send(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const userId = yield JWT_service_1.jwtService.getUserIdByToken(token);
    const user = yield query_Users_Repo_1.usersQueryRepository.findUserAccountById(userId);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    req.user = user;
    next();
});
exports.authUserMiddleware = authUserMiddleware;
//# sourceMappingURL=AuthUserMiddleware.js.map