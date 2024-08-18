import {Router, Request, Response} from "express";
import {deviceMap, securityDeviceRepository} from "../repositories/Security-Device-Repository";
import {securityDeviceCollection, tokenBlackListCollection} from "../db/db";
import {refreshTokenValidation} from "../Middleware/Refresh-Token-Middlewar";
import {jwtService} from "../Application/JWT-service";


export const securityDevicesRouter = Router({})


securityDevicesRouter.get('/devices',refreshTokenValidation, async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    const allDevices = await securityDeviceRepository.findDevices(refreshToken)
    if(!allDevices) return res.sendStatus(404)

    const userId = await jwtService.getUserIdByRefreshToken(refreshToken)
    if(!userId) return res.sendStatus(404)

    res.status(200).send(allDevices)

})

securityDevicesRouter.delete('/devices', refreshTokenValidation,async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    await securityDeviceRepository.deleteDevicesExcludeCurrent(refreshToken)

    return res.sendStatus(204)

})


securityDevicesRouter.delete('/devices/:id', refreshTokenValidation,async (req: Request, res: Response) => {

    const deviceId = req.params.id
    if (!deviceId) return res.sendStatus(404)

    const device = await securityDeviceRepository.findDeviceById(deviceId)
    if(!device) return res.sendStatus(404)

    const getDevice = await jwtService.findDeviceByRefreshToken(req.cookies.refreshToken)
    // здесь надо сравнить юзер айди у девайса и юзера по рефреш токену
    if(device.userId !== getDevice.userId) return res.sendStatus(403)

    await securityDeviceRepository.deleteDeviceById(deviceId)

    return res.sendStatus(204)

})