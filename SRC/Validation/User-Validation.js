"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
var express_validator_1 = require("express-validator");
var inputValidationBlgsANDPsts_1 = require("../inpuValidstion/inputValidationBlgsANDPsts");
var loginValidation = (0, express_validator_1.body)('login')
    .isString()
    .withMessage('Login must be a string')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Login must be no less then 3 but no longer then 10');
var passwordValidation = (0, express_validator_1.body)('password')
    .isString()
    .withMessage('Password should be a string')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Login must be no less then 6 but no longer then 20');
var emailValidation = (0, express_validator_1.body)('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .matches('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
    .withMessage('Incorrect Email');
var userValidation = function () { return [loginValidation, passwordValidation, emailValidation, inputValidationBlgsANDPsts_1.inputModelValidation]; };
exports.userValidation = userValidation;
