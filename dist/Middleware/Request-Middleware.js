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
exports.accessRequestValidation = void 0;
const db_1 = require("../db/db");
const accessRequestValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.originalUrl)
        return res.sendStatus(404);
    const ip = req.ip;
    const currentTime = new Date();
    const tenSecondsAgo = new Date(currentTime.getTime() - 10 * 1000);
    const accessData = {
        ip: ip,
        url: req.originalUrl,
        date: currentTime
    };
    yield db_1.requestsToUrlCollection.insertOne(accessData);
    const url = req.originalUrl;
    const count = yield db_1.requestsToUrlCollection.countDocuments({
        ip,
        url,
        date: { $gte: tenSecondsAgo }
    });
    if (count > 5) {
        return res.sendStatus(429);
    }
    next();
});
exports.accessRequestValidation = accessRequestValidation;
//# sourceMappingURL=Request-Middleware.js.map