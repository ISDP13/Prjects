import nodemailer from "nodemailer";
import {UserAccountDBType} from "../queryRepositories/query-Users-Repo";


export const emailAdapter = {

    async sendEmail(user: UserAccountDBType) {

        const email = user.accountData.email
        const subject = 'Email Confirmation Code'
        const message = `<h1>Thank for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}'>complete registration</a>
 </p>`

        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gorodok9592@gmail.com',
                pass: 'aetuubtscdstcfec'
            }
        })

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