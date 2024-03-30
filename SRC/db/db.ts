import {MongoClient} from 'mongodb'

import dotenv from 'dotenv'
import {BlogsDbType} from "../repositories/Blog-Repository-Mongo";
import {PostsDbType} from "../repositories/Post-Repository-Mongo";
import {UserAccountDBType, UserDbType} from "../queryRepositories/query-Users-Repo";
import {FeedbackDbType} from "../queryRepositories/query-Comm-Repo";
import {RefreshTokenDbType} from "../routes/Auth-router";
import {DeviceDbType} from "../repositories/Security-Device-Repository";
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const client = new MongoClient(mongoURI)
export const db = client.db('test')
export const blogCollection = db.collection<BlogsDbType>('Blog')
export const postsCollection= db.collection<PostsDbType>('Posts')
export const userCollection = db.collection<UserDbType>('Users')
export const feedbackCollection = db.collection<FeedbackDbType>('Feedback')
export const usersAccountCollection = db.collection<UserAccountDBType>('UsersAccounts')
export const tokenBlackListCollection = db.collection<RefreshTokenDbType>('Token_Black_List')
export const securityDeviceCollection = db.collection<DeviceDbType>('Security Devices')
export const requestsToUrlCollection = db.collection<any>('Amount Requests to URL')


console.log(process.env.MONGO_URL)

export async function runDb(){
    try {
        await client.connect();
        await client.db("BlogsDb").command({ping: 1})
        console.log("Connected to mongo server")
    } catch {
        console.log("Can't connect to bd")
        await client.close()
    }
}

