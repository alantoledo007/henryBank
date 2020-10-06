require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const LocalStorage = require('node-localstorage').LocalStorage; //localStorage backend-side
const {User} = require('../../db');
const nodemailer = require("nodemailer");


module.exports = async (ctx,res) => {
	
	const sendEmail = async (email,code) => {
		  // Generate test SMTP service account from ethereal.email
		  // Only needed if you don't have a real mail account for testing

		  // create reusable transporter object using the default SMTP transport
		   let transporter = nodemailer.createTransport({
	            host: "smtp.gmail.com",
	            port: 587,
	            secure: false,
	            auth:{
	                user:"ehenryware@gmail.com",
	                pass:"henry10ware",
	            }
        	});



		   let emailData = {
            	from:"ehenryware@gmail.com",
            	to: `${email}`,//`${email}`,
            	subject:"Codigo para restablecer tu contraseña!",
	            html:`
	                <html>
	                
	                <head>
	                <style type="text/css">
	                            @font-face {
	                              font-family: &#x27;Postmates Std&#x27;;
	                              font-weight: 600;
	                              font-style: normal;
	                              src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
	                            }
	                
	                            @font-face {
	                              font-family: &#x27;Postmates Std&#x27;;
	                              font-weight: 500;
	                              font-style: normal;
	                              src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
	                            }
	                
	                            @font-face {
	                              font-family: &#x27;Postmates Std&#x27;;
	                              font-weight: 400;
	                              font-style: normal;
	                              src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
	                            }
	                        </style>
	                <style media="screen and (max-width: 680px)">
	                            @media screen and (max-width: 680px) {
	                                .page-center {
	                                  padding-left: 0 !important;
	                                  padding-right: 0 !important;
	                                }
	                                
	                                .footer-center {
	                                  padding-left: 20px !important;
	                                  padding-right: 20px !important;
	                                }
	                            }
	                        </style>
	                </head>
	                <body style="background-color: #f4f4f5;">
	                <table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
	                <tbody><tr>
	                <td style="text-align: center;">
	                <table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
	                <tbody><tr>
	                <td>
	                <table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
	                <tbody><tr>
	                <td style="padding-top: 24px;text-align:center">
	                <img src="https://i.ibb.co/pjgz9WD/LOGO.png" style="width: 100px;margin:0 auto;">
	                </td>
	                </tr>
	                <tr>
	                <td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;text-align:center">Reestablecé tu contraseña</td>
	                </tr>
	                <tr>
	                <td style="padding-top: 48px; padding-bottom: 48px;">
	                <table cellpadding="0" cellspacing="0" style="width: 100%">
	                <tbody><tr>
	                <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
	                </tr>
	                </tbody></table>
	                </td>
	                </tr>
	                <tr>
	                <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;text-align:center">
	                                                      Este mail fue enviado porque solicitaste un cambio de contraseña en nuestra página. Si no fuiste vos, ignoralo!
	                                                    </td>
	                </tr>
	                <tr>
	                	<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;text-align:center">
	     					<h1> Tu codigo para restablecer la contraseña es el siguiente:  </h1>
	     	            </td>
	                	
	                </tr>
	                <tr>
	                	<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;text-align:center">
	     					<h1> ${code} </h1>
	     	            </td>
	                	
	                </tr>
	                </tbody></table>
	                </td>
	                </tr>
	                
	                </body>
	                </html>
	            `
	            
            }

            transporter.sendMail(emailData,(error,info)=>{
        	    if(error){
       	    	    console.log("Eror al enviar el mensaje: ",error)
            	}else{
                // console.log("Email enviado.")
                	 console.log("Message sent: %s", emailData.to);
            	}
      
        	})
      	


		 
		  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		}

	const localStorage = new LocalStorage('./storage');
	const {email} = ctx.params;

	
	const data = await User.findOne({
		where:{email:email},
		attributes:['id','name','surname']
	})
    .then(async user => {
    	if(!user)
            throw new MoleculerError("No existe un usuario asociado a ese email",401,"INNEX_EMAIL", { nodeID: ctx.nodeID, action:ctx.action.name });
    

    	const restoreCode = Math.floor(Math.random() * 899999 + 999999);
    	//envia el codigo al correo
		sendEmail(email,restoreCode);

    	const userId = user.id;//improve

		const password_reset = {
			code : restoreCode ,
			expired : false,
			createAt : Date.now()
		}
		
		//guardamos la informacion para cambiar passwd 
		//en el localStorage de BackEnd
		localStorage.setItem(userId, JSON.stringify(password_reset));

    })


	return "Codigo enviado!"
}