require("dotenv").config();
const { User } = require('../../../db');
const sender = require('../../../emails/sender');
const { MoleculerError } = require("moleculer").Errors;
const { Op } = require("sequelize");
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side

async function send_code_email_reset(ctx) {
    const { id } = ctx.meta.user;
    const { email } = ctx.params;

    //Nos fijamos primero si ya existe un usuario con el mail al que desea cambiarse el usuario que solicitó el cambio
    const user = await User.findOne({
        where: {
            email,
            // emailVerifiedAt: {
            //     [Op.is]: null
            // }
        },
        attributes: ['id', 'email', 'emailVerifiedAt']
    });
    if (user) {
        //si retornamos un 404 o si indicamos que el correo ya está verificado... estaríamos dando información de más.
        throw new MoleculerError("It is not allowed to send verification emails to: " + email, 417, "EXPECTATION_FAILED", { nodeID: ctx.nodeID, action: ctx.action.name });
    }

    //Si el mail deseado no está en uso, generamos el código de 6 dígitos
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const localStorage = new LocalStorage("./email_reset_storage");
    //Lo guardamos en localStorage con el id del usuario que solicitó el cambio
    await localStorage.setItem(id, JSON.stringify({
        code,
        expired: false,
        email,
        createdAt: Date.now()
    }));

    //Mandamos mail con el código al mail que especificó el usuario
    await sender({
        to: email,
        subject: 'Solicitud de cambio de dirección correo electrónico',
        html: 'email_verifier',
        data: { app_name: 'Quantum', code }
    });

    return { status: 200, message: "E-mail sent.", email };
}

module.exports = send_code_email_reset