import nodemailer from "nodemailer";
import {UserAccountDBType} from "../queryRepositories/query-Users-Repo";


export const recoveryCode = {

    async sendEmail(user: UserAccountDBType) {

        const email = user.accountData.email
        const subject = 'Password Recovery Code'
        const message = `<h1>To finish password recovery please follow the link below</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/password-recovery?recoveryCode=${user.emailConfirmation.confirmationCode}'>recovery password</a>
 </p>`

        // let transport = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'gorodok9592@gmail.com',
        //         pass: 'aetuubtscdstcfec'
        //     }
        // })

        await nodemailer
            .createTransport({
                service: 'gmail',
                auth: {
                    user: 'gorodok9592@gmail.com',
                    pass: 'aetuubtscdstcfec'
                }
            })
            .sendMail({
                from: 'Den <gorodok9592@gmail.com>',
                to: email,
                subject: subject,
                html: message
            })


    }
}