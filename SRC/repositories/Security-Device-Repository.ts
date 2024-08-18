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

        const userId = await jwtService.getUserIdByRefreshToken(refreshToken)

        const devices = await securityDeviceCollection.find({userId: userId}).toArray()

        return devices.map(deviceMap)
    },

    async findDeviceById(id: string):Promise<DeviceDbType | null>{
      return securityDeviceCollection.findOne({_id: id})
    },

    async findDeviceByUserId(userId: string):Promise<DeviceDbType | null>{
        return await securityDeviceCollection.findOne({userId: userId})
    },

    async deleteDevicesExcludeCurrent(refreshToken: string) {

         const userId = await jwtService.getUserIdByRefreshToken(refreshToken)

        const currentUserDevice = await securityDeviceCollection.findOne({ userId: userId});
         if (!currentUserDevice) return null

        await securityDeviceCollection.deleteMany({ userId:userId, _id: { $ne: currentUserDevice._id } });

    },

    async deleteDeviceById(id: string):Promise<any> {

        await securityDeviceCollection.deleteOne({_id: id})
    },

    async createNewDeviceAccess(user: UserAccountDBType, ip: string, userAgent: string): Promise<DeviceDbType> {
        const userId = user._id

        let newDeviceAccess = {
            _id: crypto.randomUUID(),
            userId: userId,
            ip: ip,
            title: userAgent,
            lastActiveDate: new Date().toISOString()
        }

        await securityDeviceCollection.insertOne(newDeviceAccess)

        return newDeviceAccess
    },

    async updateDate(device: DeviceDbType, newDate: string):Promise<any>{
        await securityDeviceCollection.updateOne({_id:device._id}, {$set: {lastActiveDate: newDate}})
    }

}