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
exports.userRepository = void 0;
const db_1 = require("../db/db");
exports.userRepository = {
    postNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersAccountCollection.insertOne(newUser);
            return (newUser);
        });
    },
    registrationNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersAccountCollection.insertOne(user);
            return (user);
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.userCollection.deleteOne({ _id: id });
        });
    },
    // async findLoginOrEmail (loginOrEmail: string): Promise<UserDbType | null> {
    //     return await userCollection.findOne({$or: [{email: loginOrEmail},{login: loginOrEmail}]})
    //
    // },
    findLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersAccountCollection.findOne({ $or: [{ 'accountData.email': loginOrEmail }, { 'accountData.login': loginOrEmail }] });
        });
    },
    updateConfirmation(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.usersAccountCollection.updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } });
            return result.modifiedCount === 1;
        });
    },
    findUserByConfirmationCode(emailConfirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersAccountCollection.findOne({ 'emailConfirmation.confirmationCode': emailConfirmationCode });
        });
    },
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersAccountCollection.findOne({ 'accountData.email': email });
        });
    },
    findUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersAccountCollection.findOne({ 'accountData.login': login });
        });
    },
    updateCode(_id, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.usersAccountCollection.updateOne({ _id }, { $set: { 'emailConfirmation.confirmationCode': code } });
            return result.modifiedCount === 1;
        });
    },
    updatePassword(id, passwordHash, passwordSalt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersAccountCollection.updateOne({ _id: id }, { $set: [{ passwordHash: passwordHash }, { passwordSalt: passwordSalt }, { 'accountData.passwordHash': passwordHash }] });
        });
    }
};
//# sourceMappingURL=User-Repository-Mongo.js.map