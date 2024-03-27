import {UserAccountDBType, UserDbType} from "../queryRepositories/query-Users-Repo";
import jwt from "jsonwebtoken"
import {settings} from "../settings";
import {ObjectId} from "mongodb";


export const jwtService = {

    async createJWT(user: UserAccountDBType){
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '10s'})
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

    async createRefreshJWT(user: UserAccountDBType){
        const refreshToken = jwt.sign({userId: user._id}, settings.JWT_REFRESH_SECRET, {expiresIn: '20s'})
        return refreshToken
    },

    async getUserIdByRefreshToken(token: string): Promise<any> {
        try {
            const result: any = jwt.verify(token, settings.JWT_REFRESH_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },


}