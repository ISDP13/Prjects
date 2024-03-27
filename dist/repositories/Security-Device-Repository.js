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
exports.securityDeviceRepository = exports.deviceMap = void 0;
const db_1 = require("../db/db");
const JWT_service_1 = require("../Application/JWT-service");
const deviceMap = (device) => {
    return {
        ip: device.ip,
        title: device.title,
        lastActiveDate: device.lastActiveDate,
        deviceId: device._id
    };
};
exports.deviceMap = deviceMap;
exports.securityDeviceRepository = {
    findDevices(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // тут надо найти пользователя по рефреш токену и потом засунуть этого пользователя и найти по нему девайся
            const user = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
            const devices = yield db_1.securityDeviceCollection.findOne({ userId: user._id });
            return (0, exports.deviceMap)(devices);
        });
    },
    deleteDevicesExcludeCurrent(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.securityDeviceCollection.deleteMany({ _id: { $nin: [refreshToken] } }); // todo вот тут ошибка скорей всего
        });
    },
    deleteDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.securityDeviceCollection.deleteOne({ _id: id });
        });
    }
};
//# sourceMappingURL=Security-Device-Repository.js.map