const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const categoryCtrl = require("./category.controller");
const { categoryCreateDTO, categoryUpdateDTO } = require("./category.validator");

const categoryRouter = require("express").Router();

categoryRouter.get('/home-category', categoryCtrl.getForHome)

// TODO: API TO Get all the products by category slug 
categoryRouter.get("/:slug/by-slug", categoryCtrl.getDetailBySlug)

// /category
categoryRouter.route('/')
    .post(checkLogin, allowRole("admin"), uploader().single('image'), bodyValidator(categoryCreateDTO), categoryCtrl.store)   // category create
    .get(checkLogin, allowRole("admin"), categoryCtrl.index)  // to read all the categorys 

categoryRouter.route("/:id")
    .get(checkLogin, allowRole('admin'), categoryCtrl.detail) // to get a single category by id
    .patch(checkLogin, allowRole("admin"), uploader().single("image"), bodyValidator(categoryUpdateDTO), categoryCtrl.update)  // to update a category
    .delete(checkLogin, allowRole("admin"), categoryCtrl.delete)

module.exports = categoryRouter;