const authRouter = require("express").Router();
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const authCtrl = require("./auth.controller");
const { registerDataDTO, loginDTO, activationDTO } = require("./auth.validator");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { checkLogin, checkRefreshToken } = require("../../middlewares/auth.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");

// force logout ()

// if multipart/form-data content does not have any file to upload, use .none() function

// router.post('/url', (req, res, <next>) => {}, (req, res, <next>) => {})
// router.put('/url', (req, res, <next>) => {}, (req, res, <next>) => {})
// router.patch('/url', (req, res, <next>) => {}, (req, res, <next>) => {})
// router.delete('/url', (req, res, <next>) => {}, (req, res, <next>) => {})

// postman

// /test, 
// /test1


// /regsiter
// method: post 
// Response: Json => message => your account has been registered 
authRouter.post('/register', uploader().single('image'),  bodyValidator(registerDataDTO), authCtrl.register)  // 

authRouter.post("/activate", bodyValidator(activationDTO), authCtrl.activateUser)
authRouter.post("/resend-otp", bodyValidator(activationDTO), authCtrl.resendOtp)

authRouter.post('/login', bodyValidator(loginDTO), authCtrl.login)  // 

authRouter.get('/me', checkLogin, authCtrl.getLoggedInUser)   // all the loggedin User detail
authRouter.get("/refresh", checkRefreshToken, authCtrl.getRefreshToken)


module.exports = authRouter