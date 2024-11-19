const router = require('express').Router();
const authRouter = require("../modules/auth/auth.router")
const bannerRouter = require("../modules/banners/banner.router")

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

router.use('/auth', authRouter)      // auth Router 
router.use('/banner', bannerRouter);   // banner Router

module.exports = router;