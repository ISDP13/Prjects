// //index.d.ts
// export {}
// import {UserOutput} from "../queryRepositories/query-Users-Repo";
//
//
// export declare global {
//     namespace Express {
//         export interface Request {
//             user: UserOutput | null
//         }
//     }
// }

import {UserAccountDBType, UserOutput} from "../queryRepositories/query-Users-Repo";

export declare module 'express-serve-static-core' {
    interface Request {
        user: UserAccountDBType | null
    }
}
