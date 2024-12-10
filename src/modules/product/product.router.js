const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const productCtrl = require("./product.controller");
const { productCreateDTO, productUpdateDTO } = require("./product.validator");

const productRouter = require("express").Router();

productRouter.get('/home-product', productCtrl.getForHome)

// /product
productRouter.route('/')
    .post(checkLogin, allowRole(["admin", "seller"]), uploader().array('images'), bodyValidator(productCreateDTO), productCtrl.store)   // product create
    .get(checkLogin, allowRole(["admin", "seller"]), productCtrl.index)  // to read all the products 

productRouter.route("/:id")
    .get(checkLogin, allowRole(['admin','seller']), productCtrl.detail) // to get a single product by id
    .patch(checkLogin, allowRole(["admin", "seller"]), uploader().array("images"), bodyValidator(productUpdateDTO), productCtrl.update)  // to update a product
    .delete(checkLogin, allowRole(["admin", "seller"]), productCtrl.delete)

module.exports = productRouter;