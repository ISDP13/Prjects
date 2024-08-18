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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../settings");
const Security_Device_Repository_1 = require("../repositories/Security-Device-Repository");
exports.jwtService = {
    createJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, settings_1.settings.JWT_SECRET, { expiresIn: '11111111111110s' });
            return token;
        });
    },
    getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
                return result.userId;
            }
            catch (error) {
                return null;
            }
        });
    },
    createRefreshJWT(device) {
        return __awaiter(this, void 0, void 0, function* () {
            // вот сюда надо засунуть рефреш токен айди, но тогда когда мы ищем юезра по рефреш токену, уже надо будет доставать из девайс айди айдишник юзера и только потом искать юзера
            const refreshToken = jsonwebtoken_1.default.sign({ deviceId: device._id }, settings_1.settings.JWT_REFRESH_SECRET, { expiresIn: '21111111110s' });
            return refreshToken;
        });
    },
    getUserIdByRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_REFRESH_SECRET);
                const device = yield Security_Device_Repository_1.securityDeviceRepository.findDeviceById(result.deviceId);
                return device.userId;
            }
            catch (error) {
                return null;
            }
        });
    },
    findDeviceByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(refreshToken, settings_1.settings.JWT_REFRESH_SECRET);
                const device = yield Security_Device_Repository_1.securityDeviceRepository.findDeviceById(result.deviceId);
                return device;
            }
            catch (error) {
                return null;
            }
        });
    }
};
//# sourceMappingURL=JWT-service.js.map