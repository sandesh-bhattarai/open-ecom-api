const bcrypt = require("bcryptjs")
const fileUploadSvc = require("../../services/fileuploader.service");
const {randomStringGenerator} = require("../../utilities/helpers");
const UserModel = require("./user.model");
const emailSvc = require("../../services/mail.service");

class AuthService {
    transformUserRegister =async (req) => {
        try {
            // body parser 
            let data = req.body;

            // password 
            data.password = bcrypt.hashSync(data.password, 10);
            delete data.confirmPassword;

            let file = req.file;    // single upload
            if(file) {
                data.image = await fileUploadSvc.uploadFile(file.path, '/users')
            }
            data.otp = randomStringGenerator(6, false);
            data.otpExpiryTime = new Date(Date.now() + 300000)
            data.status = 'inactive';
            // db store 
            return data
        } catch(exception) {
            console.log("TransformUserRegister", exception)
            throw exception;
        }
    }

    sendActivationNotification =async (name, otp, email) => {
        try {
            // Email notification
            let msg = `Dear ${name}, <br /> 
            <p>
            Thank you for registering with Us. Please activate your account by using the following otp code: 
            </p>
            <p>
                <strong style="color: red;">${otp}</strong>
            </p>
            <p>
            Warm Regards,
            </p>
            <p>${process.env.SMTP_FROM}</p>
            <small>
                <em>Please do not reply to this email directly.</em>
            </small>

            `;
            return await emailSvc.sendEmail({
                to: email,
                subject: "Activate your account!",
                message: msg
            })
        } catch(exception) {
            console.log("SendActivationNotification", exception)
            throw exception;
        }
    }

    createUser = async (data) => {
        try {
            const userObj = new UserModel(data);
            return await userObj.save()            // insert or update
        } catch(exception) {
            console.log("Createuser", exception)
            throw exception
        }
    }

    getSingleUserByFilter = async (filter) => {
        try {
            const user = await UserModel.findOne(filter)
            if(!user) {
                throw {code: 422, status: "USER_NOT_FOUND", message: "User not found"}
            }
            return user;
        } catch(exception) {
            console.log("getSingleUserByFilter", exception)
            throw exception
        }
    }

    resetOtp = async(user) => {
        try {
            // new otp 
            let otp = randomStringGenerator(6, false);
            let expiryTime = new Date(Date.now() + 300000)

            user.otp = otp;
            user.otpExpiryTime = expiryTime;

            return await user.save()
        } catch(exception) {
            console.log("resetOtp", exception)
            throw exception
        }
    }

    activateUser = async(user) => {
        try {
            user.otp = null; 
            user.otpExpiryTime = null; 
            user.status = 'active';

            return await user.save();
        } catch(exception) {
            console.log("resetOtp", exception)
            throw exception
        }
    }

}

const authSvc = new AuthService()

module.exports = authSvc