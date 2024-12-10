const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const brandCtrl = require("./brand.controller");
const { brandCreateDTO, brandUpdateDTO } = require("./brand.validator");

const brandRouter = require("express").Router();

brandRouter.get('/home-brand', brandCtrl.getForHome)

// TODO: API TO Get all the products by brand slug 
// brandRouter.get("/slug/:slug", brandCtrl.getProductList)

// /brand
brandRouter.route('/')
    .post(checkLogin, allowRole("admin"), uploader().single('image'), bodyValidator(brandCreateDTO), brandCtrl.store)   // brand create
    .get(checkLogin, allowRole("admin"), brandCtrl.index)  // to read all the brands 

brandRouter.route("/:id")
    .get(checkLogin, allowRole('admin'), brandCtrl.detail) // to get a single brand by id
    .patch(checkLogin, allowRole("admin"), uploader().single("image"), bodyValidator(brandUpdateDTO), brandCtrl.update)  // to update a brand
    .delete(checkLogin, allowRole("admin"), brandCtrl.delete)

module.exports = brandRouter;