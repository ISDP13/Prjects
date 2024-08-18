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
const AuthUserMiddleware_1 = require("../Middleware/AuthUserMiddleware");
const User_Repository_Mongo_1 = require("../repositories/User-Repository-Mongo");
const User_Validation_1 = require("../Validation/User-Validation");
const db_1 = require("../db/db");
const Security_Device_Repository_1 = require("../repositories/Security-Device-Repository");
const Request_Middleware_1 = require("../Middleware/Request-Middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', Request_Middleware_1.accessRequestValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_service_1.userService.checkCredential(req.body.loginOrEmail, req.body.password);
    if (!user)
        return res.sendStatus(401);
    const token = yield JWT_service_1.jwtService.createJWT(user);
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const device = yield Security_Device_Repository_1.securityDeviceRepository.createNewDeviceAccess(user, ip, userAgent);
    // в рефреш токен засовываем девайс айди
    const refreshToken = yield JWT_service_1.jwtService.createRefreshJWT(device);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).send({ accessToken: token });
}));
exports.authRouter.post('/password-recovery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO insert validation for email and access validation
    const code = yield User_service_1.userService.recoveryPasswordCode(req.body.email);
    if (!code)
        res.sendStatus(404);
    return res.sendStatus(204);
}));
exports.authRouter.post('/new-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO insert validation for email and access validation
    const user = yield User_Repository_Mongo_1.userRepository.findUserByConfirmationCode(req.body.recoveryCode);
    if (!user)
        return res.sendStatus(404);
    yield User_service_1.userService.newPassword(req.body.code, req.body.password);
    return res.sendStatus(204);
}));
exports.authRouter.get('/me', AuthUserMiddleware_1.authUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_Users_Repo_1.usersQueryRepository.findUserAccountById(req.user._id);
    if (!user)
        return res.sendStatus(404);
    res.status(200).send({
        email: user.accountData.email,
        login: user.accountData.login,
        userId: user._id
    });
}));
exports.authRouter.post('/registration', (0, User_Validation_1.userValidation)(), Request_Middleware_1.accessRequestValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_service_1.userService.registrationNewUser(req.body.login, req.body.password, req.body.email);
    return res.sendStatus(204);
}));
exports.authRouter.post('/registration-confirmation', Request_Middleware_1.accessRequestValidation, (0, User_Validation_1.codeEmailValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let code = yield User_service_1.userService.confirmEmail(req.body.code);
    if (!code)
        return res.sendStatus(400);
    return res.sendStatus(204);
}));
exports.authRouter.post('/registration-email-resending', (0, User_Validation_1.emailUserValidation)(), Request_Middleware_1.accessRequestValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_service_1.userService.resendConfirmationCode(req.body.email);
    return res.sendStatus(204);
}));
exports.authRouter.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    const findRefreshToken = yield db_1.tokenBlackListCollection.findOne({ token: refreshToken });
    if (findRefreshToken) {
        return res.sendStatus(401);
    }
    else {
        let tokenForBlackList = {
            _id: crypto.randomUUID(),
            token: refreshToken
        };
        yield db_1.tokenBlackListCollection.insertOne(tokenForBlackList);
    }
    const userIdByRefreshToken = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
    if (!userIdByRefreshToken)
        return res.sendStatus(401);
    const user = yield query_Users_Repo_1.usersQueryRepository.findUserById(userIdByRefreshToken);
    const newToken = yield JWT_service_1.jwtService.createJWT(user);
    const device = yield Security_Device_Repository_1.securityDeviceRepository.findDeviceByUserId(user._id);
    const newRefreshToken = yield JWT_service_1.jwtService.createRefreshJWT(device);
    const newDate = new Date().toISOString();
    yield Security_Device_Repository_1.securityDeviceRepository.updateDate(device, newDate);
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true }).send({ accessToken: newToken });
}));
exports.authRouter.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    const findRefreshToken = yield db_1.tokenBlackListCollection.findOne({ token: refreshToken });
    if (findRefreshToken) {
        return res.sendStatus(401);
    }
    else {
        let tokenForBlackList = {
            _id: crypto.randomUUID(),
            token: refreshToken
        };
        yield db_1.tokenBlackListCollection.insertOne(tokenForBlackList);
    }
    const userIdByRefreshToken = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
    if (!userIdByRefreshToken)
        return res.sendStatus(401);
    const device = yield JWT_service_1.jwtService.findDeviceByRefreshToken(refreshToken);
    yield Security_Device_Repository_1.securityDeviceRepository.deleteDeviceById(device._id);
    res.clearCookie('refreshToken', { httpOnly: true, secure: true }).sendStatus(204);
}));
//# sourceMappingURL=Auth-router.js.map