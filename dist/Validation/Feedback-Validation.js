"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidation = exports.contentValidation = void 0;
const express_validator_1 = require("express-validator");
const inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
exports.contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('content must be a string')
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage('content must be more then 20 but no longer then 300');
const feedbackValidation = () => [exports.contentValidation, inputValidationBlgsANDPsts_1.inputModelValidation];
exports.feedbackValidation = feedbackValidation;
//# sourceMappingURL=Feedback-Validation.js.map