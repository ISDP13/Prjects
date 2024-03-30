import {securityDeviceCollection} from "../db/db";
import {UserAccountDBType, usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {jwtService} from "../Application/JWT-service";
import LastNewline from "nodemailer/lib/mime-node/last-newline";
import {userRepository} from "./User-Repository-Mongo";

export type DeviceDbType = {
    _id: string,
    userId: string,
    ip: string,
    title: string,
    lastActiveDate: string,
}
export type DeviceOutputType = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}
export const deviceMap = (device: DeviceDbType): DeviceOutputType => {
    return {
        ip: device.ip,
        title: device.title,
        lastActiveDate: device.lastActiveDate,
        deviceId: device._id
    }
}


export const securityDeviceRepository = {

    async findDevices(refreshToken: string): Promise<DeviceOutputType[]> {
        //TODO тут надо найти пользователя по рефреш токену и потом засунуть этого пользователя и найти по нему девайся
        const userId = await jwtService.getUserIdByRefreshToken(refreshToken)
        const devices = await securityDeviceCollection.find({userId: userId}).toArray()
        return devices.map(deviceMap)
    },

    async deleteDevicesExcludeCurrent(refreshToken: string) {

        // Получение идентификатора пользователя по refresh token
         const userId = await jwtService.getUserIdByRefreshToken(refreshToken) // Предположим, что есть метод для получения идентификатора пользователя из cookies

        // Получение текущего девайса пользователя
        const currentUserDevice = await securityDeviceCollection.findOne({ userId: userId});

         if (!currentUserDevice) return null

        // Удаление всех девайсов, кроме текущего
        // TODO не удалвяет девайсы, потому что в рефреш токене зашита не девайс айди, а юзер айди
        await securityDeviceCollection.deleteMany({ userId: { $ne: currentUserDevice.userId } });

    },

    async deleteDeviceById(id: string) {

        await securityDeviceCollection.deleteOne({_id: id})
    },

    async createNewDeviceAccess(user: UserAccountDBType, ip: string): Promise<DeviceDbType> {
        const userId = user._id

        let newDeviceAccess = {
            _id: crypto.randomUUID(),
            userId: userId,
            ip: ip,
            title: 'some string',
            lastActiveDate: new Date().toISOString()
        }

        await securityDeviceCollection.insertOne(newDeviceAccess)

        return newDeviceAccess
    }
}