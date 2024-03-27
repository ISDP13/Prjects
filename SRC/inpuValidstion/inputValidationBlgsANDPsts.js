"use strict";
// noinspection AnonymousFunctionJS
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputModelValidation = void 0;
var express_validator_1 = require("express-validator");
var inputModelValidation = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req).formatWith(function (error) {
        switch (error.type) {
            case 'field':
                return {
                    message: error.msg,
                    field: error.path,
                };
            default:
                return {
                    message: error.msg,
                    field: '-----'
                };
        }
    });
    if (!errors.isEmpty()) {
        var err = errors.array({ onlyFirstError: true });
        return res.status(400).send({
            errorsMessages: err
        });
    }
    return next();
};
exports.inputModelValidation = inputModelValidation;
