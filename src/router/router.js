const router = require('express').Router();
// Routing middleware
// Routing
router.get('/health', (req, res) => {
    // login check 
    // login 
    res.json({
        data: null, 
        message: "Hello World",
        status: "SUCCESS_OK",
        options: null
    })
})



// router.get('/url', (req, res, <next>) => {}, (req, res, <next>) => {})
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
router.post('/register' , (req, res) => {
    // validate 
    // transform 
    // store in db 
    // notify 
    res.json({
        data: null, 
        message: "Your account has been registered.",
        status: "SUCCESS_OK",
        options: null
    })   
})  // 

// /login 
// method: post 
// Response: Json => message => You are logged in 
router.post('/login' , (req, res) => {
    res.json({
        data: null, 
        message: "You are logged in.",
        status: "SUCCESS_OK",
        options: null
    })   
})  // 

// /me 
// method: get 
// Response: Json => data: a user object with name, email, address, id, password(a random text), role and etc.
router.get('/me' , (req, res) => {
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
router.get('/user/:username' , (req, res) => {
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

module.exports = router;