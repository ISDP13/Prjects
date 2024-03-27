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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = require("express");
var query_Users_Repo_1 = require("../queryRepositories/query-Users-Repo");
var User_service_1 = require("../domain/User-service");
var User_Validation_1 = require("../Validation/User-Validation");
var AuthBlogsAndPosts_1 = require("../Auth/AuthBlogsAndPosts");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get('/', AuthBlogsAndPosts_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sortedData, getAllUsers;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sortedData = {
                    sortBy: (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
                    sortDirection: (_b = req.query.sortDirection) !== null && _b !== void 0 ? _b : "desc",
                    pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
                    pageSize: req.query.pageSize ? +req.query.pageSize : 10,
                    searchLoginTerm: (_c = req.query.searchLoginTerm) !== null && _c !== void 0 ? _c : null,
                    searchEmailTerm: (_d = req.query.searchEmailTerm) !== null && _d !== void 0 ? _d : null
                };
                return [4 /*yield*/, query_Users_Repo_1.usersQueryRepository.findUsers(sortedData)];
            case 1:
                getAllUsers = _e.sent();
                res.send(getAllUsers);
                return [2 /*return*/];
        }
    });
}); });
exports.usersRouter.post('/', AuthBlogsAndPosts_1.authMiddleware, (0, User_Validation_1.userValidation)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_service_1.userService.postNewUser(req.body.login, req.body.password, req.body.email)];
            case 1:
                newUser = _a.sent();
                return [2 /*return*/, res.status(201).send(newUser)];
        }
    });
}); });
exports.usersRouter.delete('/:id', AuthBlogsAndPosts_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query_Users_Repo_1.usersQueryRepository.findUserById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_service_1.userService.deleteUserById(req.params.id)];
            case 2:
                _a.sent();
                res.sendStatus(204);
                return [2 /*return*/];
        }
    });
}); });
