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
exports.securityDevicesRouter = (0, express_1.Router)({});
exports.securityDevicesRouter.get('/devices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.securityDevicesRouter.delete('/devices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.securityDevicesRouter.delete('/devices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
//# sourceMappingURL=Security-Devise_router.js.map