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
exports.codeEmailValidation = exports.emailUserValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
const User_Repository_Mongo_1 = require("../repositories/User-Repository-Mongo");
const loginValidation = (0, express_validator_1.body)('login')
    .isString()
    .withMessage('Login must be a string')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Login must be no less then 3 but no longer then 10')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_Repository_Mongo_1.userRepository.findUserByLogin(value);
    if (user) {
        throw Error("Incorrect Login");
    }
    return false;
}));
const passwordValidation = (0, express_validator_1.body)('password')
    .isString()
    .withMessage('Password should be a string')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Login must be no less then 6 but no longer then 20');
const emailValidation = (0, express_validator_1.body)('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .matches('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
    .withMessage('Incorrect Email')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_Repository_Mongo_1.userRepository.findUserByEmail(value);
    if (user) {
        throw Error("Incorrect Email");
    }
    return false;
}));
const codeValidation = (0, express_validator_1.body)('code')
    .isString()
    .withMessage('Code should be a string')
    .trim()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_Repository_Mongo_1.userRepository.findUserByConfirmationCode(value);
    if (!user) {
        throw Error("Already confirmed");
    }
    if ((user === null || user === void 0 ? void 0 : user.emailConfirmation.isConfirmed) === true) {
        throw Error("You are already Confirmed");
    }
    return false;
}));
const emailResendingValidation = (0, express_validator_1.body)('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .matches('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
    .withMessage('Incorrect Email')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_Repository_Mongo_1.userRepository.findUserByEmail(value);
    if (!user) {
        throw Error("Incorrect Email");
    }
    if ((user === null || user === void 0 ? void 0 : user.emailConfirmation.isConfirmed) === true) {
        throw Error("You are already Confirmed");
    }
    return false;
}));
const userValidation = () => [loginValidation, passwordValidation, emailValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.userValidation = userValidation;
const emailUserValidation = () => [emailResendingValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.emailUserValidation = emailUserValidation;
const codeEmailValidation = () => [codeValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.codeEmailValidation = codeEmailValidation;
//# sourceMappingURL=User-Validation.js.map