import {
    UserAccountDBOutputType,
    UserAccountDBType,
    UserDbType,
    UserOutput,
    usersQueryRepository
} from "../queryRepositories/query-Users-Repo";
import {userRepository} from "../repositories/User-Repository-Mongo";
import {DeleteResult} from "mongodb";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import add from 'date-fns/add'
import {emailAdapter} from "../adapters/email-adapters";


export const userService = {

    async postNewUserByAdmin (login: string, password: string, email: string): Promise<UserAccountDBOutputType>{

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        let newUser = {
            _id: crypto.randomUUID(),
            passwordSalt,
            passwordHash,
            accountData: {
                login,
                email,
                passwordHash,
                createdAt: new Date().toISOString()

            },
            emailConfirmation: {
                confirmationCode: '',
                expirationDate: '',
                isConfirmed: true
            },
            createdAt: new Date().toISOString()
        }

        await userRepository.postNewUser(newUser)

        return {
            id: newUser._id,
            login,
            email,
            createdAt: newUser.createdAt

        }
    },

    async registrationNewUser (login: string, password: string, email: string):Promise<UserAccountDBType | null > {

        const passwordSalt = await bcrypt.genSalt(10)

        const passwordHash = await this._generateHash(password, passwordSalt)

        const user: UserAccountDBType = {
            _id: crypto.randomUUID(),
            passwordSalt: passwordSalt,
            passwordHash: passwordHash,
            accountData: {
                login: login,
                email: email,
                passwordHash,
                createdAt: new Date().toISOString()

            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: new Date().toISOString(), // todo тут добавить экспирацию
                isConfirmed: false
            },
            createdAt:new Date().toISOString()

        }

        const newUser = await userRepository.registrationNewUser(user)

        try {
            await emailAdapter.sendEmail(user)
        } catch(error){
            console.error(error)
            // await userRepository.deleteUserById(user._id)
            return null
        }

        return newUser
    },


    async checkCredential (loginOrEmail: string, password: string) {

        const user = await userRepository.findLoginOrEmail(loginOrEmail)

        if(!user) return null

        const passwordHash = await this._generateHash(password, user.passwordSalt)

        if (user.passwordHash !== passwordHash) return false

        return user

    },

    async deleteUserById (id: string): Promise<DeleteResult>{
        return await userRepository.deleteUserById(id)
    },

    async _generateHash(password: string, salt: string){
        return await bcrypt.hash(password, salt)

    },

    async confirmEmail (code: string): Promise<boolean>{

        let user: UserAccountDBType | null = await userRepository.findUserByConfirmationCode(code)

        if(!user) return false

        if(user.emailConfirmation.confirmationCode === code) {
            return await userRepository.updateConfirmation(user._id)
        }
        return false
    },

    async resendConfirmationCode (email: string): Promise<UserAccountDBType | null | undefined>{

        const user = await userRepository.findUserByEmail(email)

        const userConfirmation = user?.emailConfirmation.isConfirmed

        if(userConfirmation !== true ) {
            const newCod = uuidv4()
            user!.emailConfirmation.confirmationCode = newCod
            await userRepository.updateCode(user!._id, newCod)
            await emailAdapter.sendEmail(user!)
        } else {
            return null
        }

    },

}