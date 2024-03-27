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
exports.feedbackQueryRepository = exports.feedbackMap = void 0;
const db_1 = require("../db/db");
const feedbackMap = (feedback) => {
    return {
        id: feedback._id,
        content: feedback.content,
        commentatorInfo: feedback.commentatorInfo,
        createdAt: feedback.createdAt
    };
};
exports.feedbackMap = feedbackMap;
exports.feedbackQueryRepository = {
    findFeedbackByIdForCheck(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.feedbackCollection.findOne({ _id: id });
            if (!comment)
                return null;
            return comment.userId;
        });
    },
    findFeedbackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.feedbackCollection.findOne({ _id: id });
            if (!comment)
                return null;
            return (0, exports.feedbackMap)(comment);
        });
    }
};
//# sourceMappingURL=query-Comm-Repo.js.map