const authRouter = require("express").Router();
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const authCtrl = require("./auth.controller");
const { registerDataDTO, loginDTO } = require("./auth.validator");
const uploader = require("../../middlewares/multipart-parser.middleware");

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

authRouter.post('/login', bodyValidator(loginDTO), authCtrl.login)  // 



module.exports = authRouter