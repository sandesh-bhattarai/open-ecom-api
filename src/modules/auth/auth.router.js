const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");


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
authRouter.post('/register', authCtrl.register)  // 
authRouter.post('/login' , authCtrl.login)  // 



module.exports = authRouter