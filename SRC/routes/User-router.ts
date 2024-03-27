import {Request, Response, Router} from "express";
import {usersQueryRepository} from "../queryRepositories/query-Users-Repo";
import {userService} from "../domain/User-service";
import {userValidation} from "../Validation/User-Validation";
import {authMiddleware} from "../Middleware/AuthBlogsAndPosts";

export const usersRouter = Router({})

usersRouter.get ('/',authMiddleware, async (req: Request, res: Response) => {
    const sortedData = {
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? "desc",
        pageNumber: req.query.pageNumber ? +req.query.pageNumber: 1,
        pageSize: req.query.pageSize ? +req.query.pageSize: 10,
        searchLoginTerm: req.query.searchLoginTerm ?? null,
        searchEmailTerm: req.query.searchEmailTerm ?? null
    }
    const getAllUsers = await usersQueryRepository.findUsers(sortedData)
    res.send(getAllUsers)
})

usersRouter.post('/',authMiddleware, userValidation(), async (req: Request, res: Response) => {
    let newUser = await userService.postNewUserByAdmin(req.body.login, req.body.password, req.body.email)
    return res.status(201).send(newUser)
})

usersRouter.delete('/:id',authMiddleware, async (req: Request, res: Response) => {
    const user = await usersQueryRepository.findUserById(req.params.id)

    if (!user) {
        res.sendStatus(404)
        return
    }
    await userService.deleteUserById(req.params.id)
    res.sendStatus(204)
})
