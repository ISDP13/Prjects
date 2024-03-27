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
exports.DeleteAllDataRouter = void 0;
const express_1 = require("express");
const Delete_Data_Repository_Mongo_1 = require("../repositories/Delete-Data-Repository-Mongo");
exports.DeleteAllDataRouter = (0, express_1.Router)({});
exports.DeleteAllDataRouter.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Delete_Data_Repository_Mongo_1.DeleteAllPosts.deleteAllData();
    res.sendStatus(204);
}));
//# sourceMappingURL=Delete-All-Data-router.js.map