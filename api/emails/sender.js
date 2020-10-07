require("dotenv").config();
const nodemailer = require('nodemailer');
const layout = require('./layout');

const {EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD} = process.env;

async function sender({to,subject,html,data}){
    
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER, // generated ethereal user
            pass: EMAIL_PASSWORD, // generated ethereal password
        },
    });



    await transporter.sendMail({
        from: 'Quantum <'+EMAIL_USER+'>', // sender address
        to: to, // list of receivers
        subject, // Subject line
        html: await layout(html,data), // html body
    });
    return true;
}

module.exports = sender;