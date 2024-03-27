import {userCollection, usersAccountCollection} from "../db/db";

export type UserDbType = {
    _id: string,
    login: string,
    passwordHash: string,
    passwordSalt: string,
    email: string,
    createdAt: string
}
export type UserOutput = {
    id: string,
    login: string,
    email: string
    createdAt: string
}
export type Pagination<I> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: I[]
}
export type UserAccountDBType = {
    _id: string,
    passwordSalt: string,
    passwordHash: string,
    accountData: {
        login: string,
        email: string,
        passwordHash: string,
        createdAt: string

    },
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: string,
        isConfirmed: boolean
    }
    createdAt: string
}
export type UserAccountDBOutputType = {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}
export const userMap = (user: UserDbType): UserOutput => {
    return {
        id: user._id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const userAccountsMap = (userAcc: UserAccountDBType): UserAccountDBOutputType => {
    return {
        id: userAcc._id,
        login: userAcc.accountData.login,
        email: userAcc.accountData.email,
        createdAt: userAcc.createdAt
    }
}

export const usersQueryRepository = {

    async findUsers(sortData: any): Promise<Pagination<UserOutput>> {
        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = sortData

        let filter = {}

        if (searchLoginTerm && searchEmailTerm) {
            filter = {
                $or: [
                    {login: {$regex: searchLoginTerm, $options: 'i'}},
                    {email: {$regex: searchEmailTerm, $options: 'i'}}
                ]
            }
        }

        const users: UserAccountDBType[] = await usersAccountCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await userCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount/pageSize)

        return {
            pageSize,
            page: pageNumber,
            pagesCount,
            totalCount,
            items: users.map(userAccountsMap)
        }

    },

    async findUserById(id: string): Promise<UserAccountDBType | null  >{
        const user = await usersAccountCollection.findOne({_id:id})
        if (!user) return null
        return user
    },

    async findUserAccountById(id: string): Promise<UserAccountDBType | null  >{
        const user = await usersAccountCollection.findOne({_id:id})
        if (!user) return null
        return user
    }

}