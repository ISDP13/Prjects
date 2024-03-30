import {NextFunction, Request, Response} from "express";
import {requestsToUrlCollection} from "../db/db";

export type AccessDbData = {
    ip: string,
    url: string,
    date: number
}

export const accessRequestValidation = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.baseUrl) return res.sendStatus(404)

    const ip = req.ip
    const currentTime = new Date()
    const tenSecondsAgo = new Date(currentTime.getTime() - 10 * 1000)

    const count = await requestsToUrlCollection.countDocuments({
        ip,
        date: {$gte: tenSecondsAgo}
    });

    if (count >= 5) {
        return res.sendStatus(429)
    }

    const accessData = {
        ip: ip,
        url: req.baseUrl,
        date: currentTime
    };
    await requestsToUrlCollection.insertOne(accessData)

    next();


}