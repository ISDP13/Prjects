import {Request, Response, Router} from "express";
import {DeleteAllPosts} from "../repositories/Delete-Data-Repository-Mongo";

export const DeleteAllDataRouter = Router({})

DeleteAllDataRouter.delete('/testing/all-data', async (req: Request, res: Response) => {

    await DeleteAllPosts.deleteAllData()
    res.sendStatus(204);
})
