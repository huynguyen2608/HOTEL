"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMailAPI = void 0;
const express = require("express");
const nodemailer = require("nodemailer");
// const adminMail="lethicham1512@gmail.com"
// const testMail = `dangquocdat2911@gmail.com`
function NewMailAPI() {
    const router = express.Router();
    router.post('/mail/sendMail', (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'phuongnam.ltc0203@gmail.com',
                pass: 'lethicham0203'
            }
        });
        const option = {
            from: `${req.body.name}<phuongnam.ltc0203@gmail.com>`,
            to: req.body.to,
            subject: req.body.title,
            text: req.body.content
        };
        transporter.sendMail(option, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log('done');
            }
        });
        res.json('Your mail has been sent successfully');
    });
    return router;
}
exports.NewMailAPI = NewMailAPI;
//# sourceMappingURL=mail.api.js.map