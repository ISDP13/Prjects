"use strict";
// Middleware=======================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
var express_validator_1 = require("express-validator");
var inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
var NameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('Name must be a string')
    .trim().isLength({ min: 1, max: 15 })
    .withMessage('Name must no longer, then 15');
var DescriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('description must be a string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('description must be around 500');
var websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage('websiteUrl must no longer, then 15');
var BlogValidation = function () { return [NameValidation, DescriptionValidation, websiteUrlValidation, inputValidationBlgsANDPsts_1.inputModelValidation]; };
exports.BlogValidation = BlogValidation;
