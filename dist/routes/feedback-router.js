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
exports.feedbackRouter = void 0;
const express_1 = require("express");
const AuthUserMiddleware_1 = require("../Middleware/AuthUserMiddleware");
const query_Comm_Repo_1 = require("../queryRepositories/query-Comm-Repo");
const Feedback_service_1 = require("../domain/Feedback-service");
const Feedback_Validation_1 = require("../Validation/Feedback-Validation");
exports.feedbackRouter = (0, express_1.Router)({});
exports.feedbackRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield query_Comm_Repo_1.feedbackQueryRepository.findFeedbackById(req.params.id);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(comment);
    return;
}));
exports.feedbackRouter.put('/:id', AuthUserMiddleware_1.authUserMiddleware, (0, Feedback_Validation_1.feedbackValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentUserId = req.user._id;
    const user = yield query_Comm_Repo_1.feedbackQueryRepository.findFeedbackByIdForCheck(req.params.id);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    if (commentUserId !== user) {
        res.sendStatus(403);
        return;
    }
    const feedback = yield Feedback_service_1.feedbackService.updateFeedback(req.body.content, req.params.id);
    if (!feedback) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
}));
exports.feedbackRouter.delete('/:id', AuthUserMiddleware_1.authUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // здесь ищем айди юзера из хедера аутха
    const commentUserId = req.user._id;
    // здесь ищем айди юзера по комментариям оставленным
    const user = yield query_Comm_Repo_1.feedbackQueryRepository.findFeedbackByIdForCheck(req.params.id);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    console.log(user);
    if (commentUserId !== user) {
        res.sendStatus(403);
        return;
    }
    const comment = yield query_Comm_Repo_1.feedbackQueryRepository.findFeedbackById(req.params.id);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    yield Feedback_service_1.feedbackService.deleteFeedbackById(req.params.id);
    res.sendStatus(204);
}));
//# sourceMappingURL=feedback-router.js.map