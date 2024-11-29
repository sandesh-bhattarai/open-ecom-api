require("dotenv").config();
const fileUploadSvc = require("../../services/fileuploader.service");
const bcrypt = require("bcryptjs");
const emailSvc = require("../../services/mail.service");
const { randomStringGenerator } = require("../../utilities/helpers");

class AuthController {
    register = async (req, res, next) => {
        try{
            // body parser 
            let data = req.body;

            // password 
            // const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, 10);

            // bcrypt.compareSync("Admin123#", data.password)

            let file = req.file;    // single upload
        
            data.image = await fileUploadSvc.uploadFile(file.path, '/users')
            data.otp = randomStringGenerator(6, false);
            data.expiryTime = ""
            data.status = 'inactive';
            // db store 
            
            // notify 
                // Email notification
                let msg = `Dear ${data.name}, <br /> 
                    <p>
                    Thank you for registering with Us. Please activate your account by using the following otp code: 
                    </p>
                    <p>
                        <strong style="color: red;">${data.otp}</strong>
                    </p>
                    <p>
                    Warm Regards,
                    </p>
                    <p>${process.env.SMTP_FROM}</p>
                    <small>
                        <em>Please do not reply to this email directly.</em>
                    </small>

                `;
                await emailSvc.sendEmail({
                    to: data.email,
                    subject: "Activate your account!",
                    message: msg
                })
            // client response 
            res.json({
                data: data, 
                message: "Register Data",
                status: "REGISTER_DATA",
                options: null
            })
        } catch(exception) {
            console.log("Register", exception)
            next(exception)
        }
    }

    login = (req, res, next) => {

    }
}


const authCtrl = new AuthController()
module.exports = authCtrl