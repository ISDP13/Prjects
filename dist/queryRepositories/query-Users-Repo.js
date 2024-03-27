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
exports.usersQueryRepository = exports.userAccountsMap = exports.userMap = void 0;
const db_1 = require("../db/db");
const userMap = (user) => {
    return {
        id: user._id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    };
};
exports.userMap = userMap;
const userAccountsMap = (userAcc) => {
    return {
        id: userAcc._id,
        login: userAcc.accountData.login,
        email: userAcc.accountData.email,
        createdAt: userAcc.createdAt
    };
};
exports.userAccountsMap = userAccountsMap;
exports.usersQueryRepository = {
    findUsers(sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm } = sortData;
            let filter = {};
            if (searchLoginTerm && searchEmailTerm) {
                filter = {
                    $or: [
                        { login: { $regex: searchLoginTerm, $options: 'i' } },
                        { email: { $regex: searchEmailTerm, $options: 'i' } }
                    ]
                };
            }
            const users = yield db_1.usersAccountCollection
                .find(filter)
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.userCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / pageSize);
            return {
                pageSize,
                page: pageNumber,
                pagesCount,
                totalCount,
                items: users.map(exports.userAccountsMap)
            };
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersAccountCollection.findOne({ _id: id });
            if (!user)
                return null;
            return user;
        });
    },
    findUserAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersAccountCollection.findOne({ _id: id });
            if (!user)
                return null;
            return user;
        });
    }
};
//# sourceMappingURL=query-Users-Repo.js.map