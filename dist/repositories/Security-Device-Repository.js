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
            const userId = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
            const devices = yield db_1.securityDeviceCollection.find({ userId: userId }).toArray();
            return devices.map(exports.deviceMap);
        });
    },
    findDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.securityDeviceCollection.findOne({ _id: id });
        });
    },
    findDeviceByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.securityDeviceCollection.findOne({ userId: userId });
        });
    },
    deleteDevicesExcludeCurrent(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield JWT_service_1.jwtService.getUserIdByRefreshToken(refreshToken);
            const currentUserDevice = yield db_1.securityDeviceCollection.findOne({ userId: userId });
            if (!currentUserDevice)
                return null;
            yield db_1.securityDeviceCollection.deleteMany({ userId: userId, _id: { $ne: currentUserDevice._id } });
        });
    },
    deleteDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.securityDeviceCollection.deleteOne({ _id: id });
        });
    },
    createNewDeviceAccess(user, ip, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = user._id;
            let newDeviceAccess = {
                _id: crypto.randomUUID(),
                userId: userId,
                ip: ip,
                title: userAgent,
                lastActiveDate: new Date().toISOString()
            };
            yield db_1.securityDeviceCollection.insertOne(newDeviceAccess);
            return newDeviceAccess;
        });
    },
    updateDate(device, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.securityDeviceCollection.updateOne({ _id: device._id }, { $set: { lastActiveDate: newDate } });
        });
    }
};
//# sourceMappingURL=Security-Device-Repository.js.map