require("dotenv").config();
const fileUploadSvc = require("../../services/fileuploader.service");
const bcrypt = require("bcryptjs");
const emailSvc = require("../../services/mail.service");
const { randomStringGenerator } = require("../../utilities/helpers");
const authSvc = require("./auth.service");
const jwt = require("jsonwebtoken");

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

            if(data.otp !== user.otp) {
                throw {code: 403, message: "Invalid OTP CODE", status: "OTP_INVALID"}
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

    login = async (req, res, next) => {
        try {
            const data = req.body; 
            const user = await authSvc.getSingleUserByFilter({
                email: data.email
            })

            // active 
            if(user.status !== 'active') {
                throw {code: 401, message: "Account not activated", status: "ACCOUNT_NOT_ACTIVE"}
            }

            // verify password 
            if(bcrypt.compareSync(data.password, user.password)) {
                // jwt token 
                let accessToken = jwt.sign({
                    sub: user._id,
                    typ: "bearer"
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });

                let refreshToken =  jwt.sign({
                    sub: user._id,
                    typ: "refresh"
                }, process.env.JWT_SECRET, {
                    expiresIn: "10d",
                });

                res.json({
                    detail: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: {
                            _id: user._id, 
                            name: user.name, 
                            email: user.email, 
                            role: user.role, 
                            image: user.image
                        }
                    },
                    message: "User Login success",
                    status: "LOGIN_SUCCESSS",
                    options: null
                })
            } else {
                throw {code: 401, message: "Credential does not match", status: "CREDENTIAL_MISMATCH"}
            }
        } catch(exception) {
            console.log("Login: ", exception)
            next(exception)
        }
    }

    getLoggedInUser = async(req, res, next) => {
        try {
            res.json({
                detail: req.authUser,
                message: "Your profile",
                status: "YOUR_PROFILE",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    getRefreshToken = async(req, res, next) => {
        try {
            let user = req.authUser;

            let accessToken = jwt.sign({
                sub: user._id,
                typ: "bearer"
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            let refreshToken =  jwt.sign({
                sub: user._id,
                typ: "refresh"
            }, process.env.JWT_SECRET, {
                expiresIn: "10d",
            });
            res.json({
                detail: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                message: "Token Refreshed",
                status: "REFRESH_TOKEN",
                options: null
            })
        } catch(exception) {
            console.log("getRefreshToken", exception)
            next(exception);
        }
    }
}


const authCtrl = new AuthController()
module.exports = authCtrl