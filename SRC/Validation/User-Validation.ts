import {body} from "express-validator";
import {inputModelValidation} from "../inpuValidstion/inputValidationBlgsANDPsts";
import {blogsQueryRepository} from "../queryRepositories/query-Blog-Repo";
import {userRepository} from "../repositories/User-Repository-Mongo";


const loginValidation = body('login')
    .isString()
    .withMessage('Login must be a string')
    .trim()
    .isLength({min: 3, max: 10})
    .withMessage('Login must be no less then 3 but no longer then 10')
    .custom(async (value) => {
        const user = await userRepository.findUserByLogin(value)
        if (user) {
            throw Error("Incorrect Login")
        }
        return false
    })

const passwordValidation = body('password')
    .isString()
    .withMessage('Password should be a string')
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('Login must be no less then 6 but no longer then 20')

const emailValidation = body('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .matches('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
    .withMessage('Incorrect Email')
    .custom(async (value) => {
        const user = await userRepository.findUserByEmail(value)
        if (user) {
            throw Error("Incorrect Email")
        }
        return false
    })

const codeValidation = body('code')
    .isString()
    .withMessage('Code should be a string')
    .trim()
    .custom(async (value) => {
        const user = await userRepository.findUserByConfirmationCode(value)
        if (!user) {
            throw Error("Already confirmed")
        }
        if (user?.emailConfirmation.isConfirmed === true) {
            throw Error("You are already Confirmed")
        }
        return false


    })


const emailResendingValidation = body('email')
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .matches('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
    .withMessage('Incorrect Email')
    .custom(async (value) => {
        const user = await userRepository.findUserByEmail(value)
        if (!user) {
            throw Error("Incorrect Email")
        }
        if (user?.emailConfirmation.isConfirmed === true) {
            throw Error("You are already Confirmed")
        }
        return false

    })


export const userValidation = () => [loginValidation, passwordValidation, emailValidation, inputModelValidation]
export const emailUserValidation = () => [emailResendingValidation, inputModelValidation]
export const codeEmailValidation = () => [codeValidation, inputModelValidation]
