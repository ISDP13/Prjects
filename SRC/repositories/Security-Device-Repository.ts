import {securityDeviceCollection} from "../db/db";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {jwtService} from "../Application/JWT-service";

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
export const deviceMap=(device: DeviceDbType): DeviceOutputType =>{
    return {
        ip: device.ip,
        title: device.title,
        lastActiveDate: device.lastActiveDate,
        deviceId: device._id
    }
}


export const securityDeviceRepository = {

    async findDevices(refreshToken: string): Promise<DeviceOutputType>{
        // тут надо найти пользователя по рефреш токену и потом засунуть этого пользователя и найти по нему девайся
        const user = await jwtService.getUserIdByRefreshToken(refreshToken)
        const devices = await securityDeviceCollection.findOne({userId: user._id})
        return deviceMap(devices!)
    },

    async deleteDevicesExcludeCurrent(refreshToken: string){
      await securityDeviceCollection.deleteMany({ _id: { $nin: [refreshToken]}}) // todo вот тут ошибка скорей всего

    },

    async deleteDeviceById(id: string){
        await securityDeviceCollection.deleteOne({_id:id})
    }
}