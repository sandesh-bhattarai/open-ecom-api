require("dotenv").config();
const fileUploadSvc = require("../../services/fileuploader.service");
const bcrypt = require("bcryptjs");
const emailSvc = require("../../services/mail.service");
const { randomStringGenerator } = require("../../utilities/helpers");
const authSvc = require("./auth.service");

class AuthController {
    register = async (req, res, next) => {
        try{
            let data = await authSvc.transformUserRegister(req);
            
            const user = await authSvc.createUser(data);
            // notify 
            await authSvc.sendActivationNotification(data.name, data.otp, data.email)

            // client response 
            res.json({
                data: user, 
                message: "Register Data",
                status: "REGISTER_DATA",
                options: null
            })
        } catch(exception) {
            console.log("Register", exception)
            next(exception)
        }
    }

    // activate
    activateUser = async(req, res, next) => {
        try{
            const data = req.body;      // email, otp
            const user = await authSvc.getSingleUserByFilter({
                email: data.email
            })

            // pre activated user
            if(user.status  === 'active') {
                throw {code: 403, message: "User already activated", status: "ALREADY_ACTIVATED_USER"}
            }
            // otp verify 
            // expiry time 
            let today = Date.now(); // now 9:00
            let otpExpiry = user.otpExpiryTime.getTime(); // expriy time  8:00
            
            if(today > otpExpiry) {
                throw {code: 422, message: "OTP Expired", status: "OTP_EXPIRED"}
            }

            await authSvc.activateUser(user)
            res.json({
                detail: null, 
                message: "User Activated successfully",
                staauts: "USER_ACTIVATED",
                options: null
            })
        } catch(exception) {
            console.log("ActivateUser: ", exception)
            next(exception)
        }
    }

    resendOtp  = async(req, res, next) => {
        try{
            const data = req.body;      // email, otp
            let user = await authSvc.getSingleUserByFilter({
                email: data.email
            })

            // pre activated user
            if(user.status  === 'active') {
                throw {code: 403, messag: "User already activated", status: "ALREADY_ACTIVATED_USER"}
            }
            // otp verify 

            // expiry time 
            let today = Date.now(); // now 9:00
            let otpExpiry = user.otpExpiryTime.getTime(); // expriy time  8:00
            
            if(today <= otpExpiry) {
                throw {code: 403, message: "OTP Not Expired", status: "OTP_NOT_EXPIRED"}
            }

            user = await authSvc.resetOtp(user);

            await authSvc.sendActivationNotification(user.name, user.otp, user.email);

            res.json({
                detail: {otp: user.otp},
                status: "OTP_RESEND",
                message: "A new otp code has been sent to the registered email",
                options: null
            })

        } catch(exception) {
            console.log("resndOtp: ", exception)
            next(exception)
        }
    }

    login = (req, res, next) => {

    }
}


const authCtrl = new AuthController()
module.exports = authCtrl