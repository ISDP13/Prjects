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
const express_validator_1 = require("express-validator");
const User_Repository_Mongo_1 = require("../repositories/User-Repository-Mongo");
const RefreshTokenValidator = (0, express_validator_1.body)('refreshToken')
    .isString()
    .withMessage('Login must be a string')
    .trim()
    .exists()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_Repository_Mongo_1.userRepository.findUserByLogin(value);
    if (user) {
        throw Error("Incorrect Login");
    }
    return false;
}));
//# sourceMappingURL=Refresh-Token-Validation.js.map