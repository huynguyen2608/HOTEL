import * as express from "express"
import * as nodemailer from 'nodemailer'
import { getMaxListeners } from "process";

// const adminMail="lethicham1512@gmail.com"
// const testMail = `dangquocdat2911@gmail.com`

export function NewMailAPI() {
    const router = express.Router();

    router.post('/mail/sendMail', (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'phuongnam.ltc0203@gmail.com',
                pass: 'lethicham0203'
            }
        })
        const option = {
            from: `${req.body.name}<phuongnam.ltc0203@gmail.com>`,
            to: req.body.to,
            subject: req.body.title,
            text: req.body.content
        }
        transporter.sendMail(option, (err) => {
            if (err) {
                throw err
            }
            else {
                console.log('done');
            }
        })
        res.json('Your mail has been sent successfully')
    })
    return router
}