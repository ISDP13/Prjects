"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.recoveryCode = {
    sendEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = user.accountData.email;
            const subject = 'Password Recovery Code';
            const message = `<h1>To finish password recovery please follow the link below</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/password-recovery?recoveryCode=${user.emailConfirmation.confirmationCode}'>recovery password</a>
 </p>`;
            // let transport = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'gorodok9592@gmail.com',
            //         pass: 'aetuubtscdstcfec'
            //     }
            // })
            yield nodemailer_1.default
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
            });
        });
    }
};
//# sourceMappingURL=password-recovery-via-email.js.map