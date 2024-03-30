import {Router, Request, Response} from "express";
import {securityDeviceRepository} from "../repositories/Security-Device-Repository";
import {tokenBlackListCollection} from "../db/db";


export const securityDevicesRouter = Router({})


securityDevicesRouter.get('/devices', async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    // TODO вынести эту хуйню с 401 ошибкой в мидлвар

    const findRefreshToken = await tokenBlackListCollection.findOne({token: refreshToken})
    if (findRefreshToken) return res.sendStatus(401)

    const allDevices = await securityDeviceRepository.findDevices(refreshToken)

    res.status(200).send(allDevices)

})

securityDevicesRouter.delete('/devices', async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    await securityDeviceRepository.deleteDevicesExcludeCurrent(refreshToken)

    return res.sendStatus(204)

    //TODO Девайс айди запихнуть в рефреш токен

})


securityDevicesRouter.delete('/devices/:id', async (req: Request, res: Response) => {

    const deviceId = req.params.id
    if (!deviceId) return res.sendStatus(404)

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    // TODO вынести эту хуйню с 401 ошибкой в мидлвар

    const findRefreshToken = await tokenBlackListCollection.findOne({token: refreshToken})
    if (findRefreshToken) return res.sendStatus(401)

    await securityDeviceRepository.deleteDeviceById(deviceId)

    return res.sendStatus(204)

})