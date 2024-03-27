import {UserAccountDBType, UserDbType, UserOutput} from "../queryRepositories/query-Users-Repo";
import {DeleteResult, ObjectId} from "mongodb";
import {userCollection, usersAccountCollection} from "../db/db";


export const userRepository = {

    async postNewUser(newUser: UserAccountDBType): Promise<UserAccountDBType> {
        await usersAccountCollection.insertOne(newUser)
        return (newUser)
    },

    async registrationNewUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        await usersAccountCollection.insertOne(user)
        return (user)
    },

    async deleteUserById(id: string): Promise<DeleteResult> {
        return await userCollection.deleteOne({_id: id})

    },

    // async findLoginOrEmail (loginOrEmail: string): Promise<UserDbType | null> {
    //     return await userCollection.findOne({$or: [{email: loginOrEmail},{login: loginOrEmail}]})
    //
    // },

    async findLoginOrEmail (loginOrEmail: string): Promise<UserAccountDBType | null> {
        return await usersAccountCollection.findOne({$or: [{'accountData.email': loginOrEmail},{'accountData.login': loginOrEmail}]})

    },

    async updateConfirmation (_id: string ):Promise<boolean> {
        let result = await usersAccountCollection.updateOne({_id},{$set: {'emailConfirmation.isConfirmed': true}})

        return result.modifiedCount === 1
    },

    async findUserByConfirmationCode (emailConfirmationCode: string):Promise<UserAccountDBType | null> {
        return  await usersAccountCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
    },

    async findUserByEmail (email:string):Promise<UserAccountDBType | null>{
        return await usersAccountCollection.findOne({'accountData.email': email})

    },

    async findUserByLogin (login:string):Promise<UserAccountDBType | null>{
        return await usersAccountCollection.findOne({'accountData.login': login})

    },

    async updateCode(_id: string, code: string) {
        let result = await usersAccountCollection.updateOne({_id},{$set: {'emailConfirmation.confirmationCode': code}})
        return result.modifiedCount === 1

    }
}