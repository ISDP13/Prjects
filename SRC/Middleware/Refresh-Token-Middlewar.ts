import {NextFunction, Request, Response} from "express";
import {tokenBlackListCollection} from "../db/db";




export const refreshTokenValidation =  async (req: Request, res: Response, next: NextFunction)=>{

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const findRefreshToken = await tokenBlackListCollection.findOne({token: refreshToken})
    if (findRefreshToken) return res.sendStatus(401)

    next()
}


