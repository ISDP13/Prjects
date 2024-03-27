import {db} from "../db/db";


export const DeleteAllPosts = {
    async deleteAllData(): Promise<any> {
        await db.dropDatabase()

    }

}
