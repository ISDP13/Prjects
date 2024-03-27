import {body} from "express-validator";
import {inputModelValidation} from "../inpuValidstion/inputValidationBlgsANDPsts";


export const contentValidation = body('content')
    .isString()
    .withMessage('content must be a string')
    .trim()
    .isLength({min: 20, max: 300})
    .withMessage('content must be more then 20 but no longer then 300')

export const feedbackValidation = ()=> [contentValidation, inputModelValidation]