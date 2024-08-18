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
exports.userService = void 0;
const User_Repository_Mongo_1 = require("../repositories/User-Repository-Mongo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const email_adapters_1 = require("../adapters/email-adapters");
const password_recovery_via_email_1 = require("../adapters/password-recovery-via-email");
exports.userService = {
    postNewUserByAdmin(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            let newUser = {
                _id: crypto.randomUUID(),
                passwordSalt,
                passwordHash,
                accountData: {
                    login,
                    email,
                    passwordHash,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: '',
                    expirationDate: '',
                    isConfirmed: true
                },
                createdAt: new Date().toISOString()
            };
            yield User_Repository_Mongo_1.userRepository.postNewUser(newUser);
            return {
                id: newUser._id,
                login,
                email,
                createdAt: newUser.createdAt
            };
        });
    },
    registrationNewUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const user = {
                _id: crypto.randomUUID(),
                passwordSalt: passwordSalt,
                passwordHash: passwordHash,
                accountData: {
                    login: login,
                    email: email,
                    passwordHash,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: new Date().toISOString(), // todo тут добавить экспирацию
                    isConfirmed: false
                },
                createdAt: new Date().toISOString()
            };
            const newUser = yield User_Repository_Mongo_1.userRepository.registrationNewUser(user);
            try {
                yield email_adapters_1.emailAdapter.sendEmail(user);
            }
            catch (error) {
                console.error(error);
                // await userRepository.deleteUserById(user._id)
                return null;
            }
            return newUser;
        });
    },
    checkCredential(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_Repository_Mongo_1.userRepository.findLoginOrEmail(loginOrEmail);
            if (!user)
                return null;
            const passwordHash = yield this._generateHash(password, user.passwordSalt);
            if (user.passwordHash !== passwordHash)
                return false;
            return user;
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Repository_Mongo_1.userRepository.deleteUserById(id);
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, salt);
        });
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_Repository_Mongo_1.userRepository.findUserByConfirmationCode(code);
            if (!user)
                return false;
            if (user.emailConfirmation.confirmationCode === code) {
                return yield User_Repository_Mongo_1.userRepository.updateConfirmation(user._id);
            }
            return false;
        });
    },
    resendConfirmationCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_Repository_Mongo_1.userRepository.findUserByEmail(email);
            const userConfirmation = user === null || user === void 0 ? void 0 : user.emailConfirmation.isConfirmed;
            if (userConfirmation !== true) {
                const newCod = (0, uuid_1.v4)();
                user.emailConfirmation.confirmationCode = newCod;
                yield User_Repository_Mongo_1.userRepository.updateCode(user._id, newCod);
                yield email_adapters_1.emailAdapter.sendEmail(user);
            }
            else {
                return null;
            }
        });
    },
    recoveryPasswordCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_Repository_Mongo_1.userRepository.findUserByEmail(email);
            if (!user)
                return null;
            const newCode = (0, uuid_1.v4)();
            yield User_Repository_Mongo_1.userRepository.updateCode(user._id, newCode);
            try {
                yield password_recovery_via_email_1.recoveryCode.sendEmail(user);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    },
    newPassword(recoveryCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_Repository_Mongo_1.userRepository.findUserByConfirmationCode(recoveryCode);
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(newPassword, passwordSalt);
            yield User_Repository_Mongo_1.userRepository.updatePassword(user._id, passwordHash, passwordSalt);
        });
    }
};
//# sourceMappingURL=User-service.js.map