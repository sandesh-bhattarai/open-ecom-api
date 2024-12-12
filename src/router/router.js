const router = require('express').Router();
const authRouter = require("../modules/auth/auth.router")
const bannerRouter = require("../modules/banners/banner.router")
const brandRouter = require("../modules/brand/brand.router")
const categoryRouter = require("../modules/category/category.router");
const orderRouter = require('../modules/order/order.router');
const productRouter = require("../modules/product/product.router")

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
router.use("/brand", brandRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use('/order', orderRouter)

module.exports = router;