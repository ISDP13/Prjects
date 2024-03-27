import {body} from "express-validator";
import {userRepository} from "../repositories/User-Repository-Mongo";


const RefreshTokenValidator = body('refreshToken')
    .isString()
    .withMessage('Login must be a string')
    .trim()
    .exists()
    .custom(async (value) => {
        const user = await userRepository.findUserByLogin(value)
        if (user) {
            throw Error("Incorrect Login")
        }
        return false
    })