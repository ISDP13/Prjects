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
exports.securityDevicesRouter = void 0;
const express_1 = require("express");
const Security_Device_Repository_1 = require("../repositories/Security-Device-Repository");
const db_1 = require("../db/db");
exports.securityDevicesRouter = (0, express_1.Router)({});
exports.securityDevicesRouter.get('/devices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    // TODO вынести эту хуйню с 401 ошибкой в мидлвар
    const findRefreshToken = yield db_1.tokenBlackListCollection.findOne({ token: refreshToken });
    if (findRefreshToken)
        return res.sendStatus(401);
    const allDevices = yield Security_Device_Repository_1.securityDeviceRepository.findDevices(refreshToken);
    res.status(200).send(allDevices);
}));
exports.securityDevicesRouter.delete('/devices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    yield Security_Device_Repository_1.securityDeviceRepository.deleteDevicesExcludeCurrent(refreshToken);
    return res.sendStatus(204);
    //TODO Девайс айди запихнуть в рефреш токен
}));
exports.securityDevicesRouter.delete('/devices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.params.id;
    if (!deviceId)
        return res.sendStatus(404);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    // TODO вынести эту хуйню с 401 ошибкой в мидлвар
    const findRefreshToken = yield db_1.tokenBlackListCollection.findOne({ token: refreshToken });
    if (findRefreshToken)
        return res.sendStatus(401);
    yield Security_Device_Repository_1.securityDeviceRepository.deleteDeviceById(deviceId);
    return res.sendStatus(204);
}));
//# sourceMappingURL=Security-Device_router.js.map