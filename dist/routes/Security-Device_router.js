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
const Refresh_Token_Middlewar_1 = require("../Middleware/Refresh-Token-Middlewar");
const JWT_service_1 = require("../Application/JWT-service");
exports.securityDevicesRouter = (0, express_1.Router)({});
exports.securityDevicesRouter.get('/devices', Refresh_Token_Middlewar_1.refreshTokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const allDevices = yield Security_Device_Repository_1.securityDeviceRepository.findDevices(refreshToken);
    if (!allDevices)
        return res.sendStatus(404);
    const userId = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
    if (!userId)
        return res.sendStatus(404);
    res.status(200).send(allDevices);
}));
exports.securityDevicesRouter.delete('/devices', Refresh_Token_Middlewar_1.refreshTokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    yield Security_Device_Repository_1.securityDeviceRepository.deleteDevicesExcludeCurrent(refreshToken);
    return res.sendStatus(204);
}));
exports.securityDevicesRouter.delete('/devices/:id', Refresh_Token_Middlewar_1.refreshTokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.params.id;
    if (!deviceId)
        return res.sendStatus(404);
    const device = yield Security_Device_Repository_1.securityDeviceRepository.findDeviceById(deviceId);
    if (!device)
        return res.sendStatus(404);
    const getDevice = yield JWT_service_1.jwtService.findDeviceByRefreshToken(req.cookies.refreshToken);
    // здесь надо сравнить юзер айди у девайса и юзера по рефреш токену
    if (device.userId !== getDevice.userId)
        return res.sendStatus(403);
    yield Security_Device_Repository_1.securityDeviceRepository.deleteDeviceById(deviceId);
    return res.sendStatus(204);
}));
//# sourceMappingURL=Security-Device_router.js.map