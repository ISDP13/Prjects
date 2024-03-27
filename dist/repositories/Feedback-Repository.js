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
exports.feedbackRepository = void 0;
const db_1 = require("../db/db");
const query_Comm_Repo_1 = require("../queryRepositories/query-Comm-Repo");
exports.feedbackRepository = {
    postNewFeedback(newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.feedbackCollection.insertOne(newComment);
            return (0, query_Comm_Repo_1.feedbackMap)(newComment);
        });
    },
    updateFeedbackById(content, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield query_Comm_Repo_1.feedbackQueryRepository.findFeedbackById(id);
            if (!comment) {
                return null;
            }
            return yield db_1.feedbackCollection.updateOne({ _id: id }, {
                $set: {
                    content: content
                }
            });
        });
    },
    deleteFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.feedbackCollection.deleteOne({ _id: id });
        });
    }
};
//# sourceMappingURL=Feedback-Repository.js.map