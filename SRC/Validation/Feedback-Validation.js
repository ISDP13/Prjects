"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidation = void 0;
var express_validator_1 = require("express-validator");
var contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('content must be a string')
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage('content must be more then 20 but no longer then 300');
var feedbackValidation = function () { contentValidation; };
exports.feedbackValidation = feedbackValidation;
