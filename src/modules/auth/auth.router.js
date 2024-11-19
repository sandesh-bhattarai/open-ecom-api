const authRouter = require("express").Router();

const registerUser =  (req, res, next) => {
    // store in db 
    // notify 
    res.json({
        data: null, 
        message: "Your account has been registered.",
        status: "SUCCESS_OK",
        options: null
    })   
}

// http://localhost:9005/auth/register
// authRouter.get('/url', (req, res, <next>) => {}, (req, res, <next>) => {})
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
authRouter.post('/register',(req, res ,next) => {
    // transform 
    console.log("I am first call")
    next()
}, (req, res ,next) => {
    // validate 
    console.log("I am Second call")
    next()
}, registerUser)  // 

// /login 
// method: post 
// Response: Json => message => You are logged in 
authRouter.post('/login' , (req, res, next) => {
    res.json({
        data: null, 
        message: "You are logged in.",
        status: "SUCCESS_OK",
        options: null
    })   
})  // 

const checkLogin = (req, res, next) => {
    // // check login 
    // // next();
    // res.json()
    next()
}

// /me 
// method: get 
// Response: Json => data: a user object with name, email, address, id, password(a random text), role and etc.
authRouter.get('/me' ,checkLogin,  (req, res, next) => {
    // user needs to login
    res.json({
        data: {
            id: 123, 
            name: "Sandesh Bhattarai",
            email: "sandesh@broadwayinfosys.com",
            password: "admin123",
            role:"Trainer",
            address: "Kathmandu"
        }, 
        message: "Your profile.",
        status: "SUCCESS_OK",
        options: null
    })   
})  // 

// /user/sandesh
// method: get 
// Response: Json => data: sandesh
authRouter.get('/user/:username',checkLogin, (req, res, next) => {
    // user needs to login
    const params= req.params         // {username: "sandesh"}
    const query = req.query         // object 
    res.json({
        data: {
            params,
            query
        }, 
        message: `Your account ${params.username}.`,
        status: "SUCCESS_OK",
        options: null
    })   
})  // 


module.exports = authRouter