import {UserAccountDBType, UserDbType} from "../queryRepositories/query-Users-Repo";
import jwt from "jsonwebtoken"
import {settings} from "../settings";
import {ObjectId} from "mongodb";
import {DeviceDbType, securityDeviceRepository} from "../repositories/Security-Device-Repository";


export const jwtService = {

    async createJWT(user: UserAccountDBType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '11111111111110s'})
        return token
    },

    async getUserIdByToken(token: string): Promise<any> {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },

    async createRefreshJWT(device: DeviceDbType): Promise<any> {
        // вот сюда надо засунуть рефреш токен айди, но тогда когда мы ищем юезра по рефреш токену, уже надо будет доставать из девайс айди айдишник юзера и только потом искать юзера
        const refreshToken = jwt.sign({deviceId: device._id}, settings.JWT_REFRESH_SECRET, {expiresIn: '21111111110s'})
        return refreshToken
    },

    async getUserIdByRefreshToken(token: string): Promise<any> {
        try {
            const result: any = jwt.verify(token, settings.JWT_REFRESH_SECRET)

            const device = await securityDeviceRepository.findDeviceById(result.deviceId)

            return device!.userId

        } catch (error) {
            return null
        }
    },

    async findDeviceByRefreshToken(refreshToken: string): Promise<any> {
        try {
            const result: any = jwt.verify(refreshToken, settings.JWT_REFRESH_SECRET)

            const device = await securityDeviceRepository.findDeviceById(result.deviceId)

            return device

        } catch (error) {
            return null
        }
    }


}