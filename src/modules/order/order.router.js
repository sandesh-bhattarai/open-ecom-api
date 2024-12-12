const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/bodyvalidator.middleware')
const { allowRole } = require('../../middlewares/rbac.middleware')
const orderCtrl = require('./order.controller')
const { AddToCartDTO } = require('./order.validator')

const orderRouter = require('express').Router()

// add to cart 
orderRouter.post('/add-to-cart', checkLogin, allowRole(['customer','admin']), bodyValidator(AddToCartDTO), orderCtrl.addToCart)
// view cart Items 
orderRouter.get("/my-cart", checkLogin, allowRole(['admin','customer']), orderCtrl.myCart)
module.exports = orderRouter