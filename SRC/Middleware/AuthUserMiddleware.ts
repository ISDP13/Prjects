import {NextFunction, Request, Response} from "express";
import {jwtService} from "../Application/JWT-service";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {userRepository} from "../repositories/User-Repository-Mongo";



export const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId= await jwtService.getUserIdByToken(token)

    const user =  await usersQueryRepository.findUserAccountById(userId)

    if (!user) {
        res.sendStatus(401)
        return
    }
    req.user = user
    next()

}