import {Request, Response, Router} from "express";
import {userService} from "../domain/User-service";
import {jwtService} from "../Application/JWT-service";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {authUserMiddleware} from "../Middleware/AuthUserMiddleware";
import nodemailer from 'nodemailer'
import {userRepository} from "../repositories/User-Repository-Mongo";
import {codeEmailValidation, emailUserValidation, userValidation} from "../Validation/User-Validation";
import cookieParser from "cookie-parser";
import {tokenBlackListCollection} from "../db/db";
import {securityDeviceRepository} from "../repositories/Security-Device-Repository";
import {accessRequestValidation} from "../Middleware/Request-Middleware";


export const authRouter = Router({})
export type RefreshTokenDbType = {
    _id:string,
    token: string
}

authRouter.post('/login',accessRequestValidation, async (req: Request, res: Response) => {

    // TODO Юзер агент какой то подключить

    const user = await userService.checkCredential(req.body.loginOrEmail, req.body.password)
    if (!user) return res.sendStatus(401)

    const token = await jwtService.createJWT(user)

    // вот тут сейчас добавилось создание девайс акцесса и занос его в базу данных с айпи

    const ip = req.ip

    const device = await securityDeviceRepository.createNewDeviceAccess(user, ip!)

    // в рефреш токен засовываем девайс айди
    const refreshToken = await jwtService.createRefreshJWT(user)



    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})
    res.status(200).send({accessToken: token, device})

})

authRouter.get('/me', authUserMiddleware, async (req, res) => {

    const user = await usersQueryRepository.findUserAccountById(req.user!._id)

    if (!user) return res.sendStatus(404)
    res.status(200).send({
        email: user.accountData.email,
        login: user.accountData.login,
        userId: user._id
    })

})

authRouter.post('/registration', userValidation(),accessRequestValidation, async (req: Request, res: Response) => {


    await userService.registrationNewUser(req.body.login, req.body.password, req.body.email)

    return res.sendStatus(204)

})

authRouter.post('/registration-confirmation', codeEmailValidation(),accessRequestValidation, async (req: Request, res: Response) => {


    let code = await userService.confirmEmail(req.body.code)

    if (!code) return res.sendStatus(400)

    return res.sendStatus(204)
})

authRouter.post('/registration-email-resending', emailUserValidation(),accessRequestValidation, async (req: Request, res: Response) => {

    await userService.resendConfirmationCode(req.body.email)


    return res.sendStatus(204)
})

authRouter.post('/refresh-token', async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.sendStatus(401)

    const findRefreshToken = await tokenBlackListCollection.findOne({token:refreshToken})

    if(findRefreshToken) {
        return res.sendStatus(401)
    } else {
        let tokenForBlackList = {
            _id: crypto.randomUUID(),
            token: refreshToken
        }
        await tokenBlackListCollection.insertOne(tokenForBlackList)
    }

    const userIdByRefreshToken = await jwtService.getUserIdByRefreshToken(refreshToken)

    if(!userIdByRefreshToken) return res.sendStatus(401)

    const user = await usersQueryRepository.findUserById(userIdByRefreshToken)

    const newToken = await jwtService.createJWT(user!)

    const newRefreshToken = await jwtService.createRefreshJWT(user!)

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true}).send({accessToken: newToken})

})

authRouter.post('/logout', async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.sendStatus(401)

    const findRefreshToken = await tokenBlackListCollection.findOne({token:refreshToken})

    if(findRefreshToken) {
        return res.sendStatus(401)
    } else {
        let tokenForBlackList = {
            _id: crypto.randomUUID(),
            token: refreshToken
        }
        await tokenBlackListCollection.insertOne(tokenForBlackList)
    }

    const userIdByRefreshToken = await jwtService.getUserIdByRefreshToken(refreshToken)

    if(!userIdByRefreshToken) return res.sendStatus(401)

    res.clearCookie('refreshToken', {httpOnly: true, secure: true}).sendStatus(204)


})

