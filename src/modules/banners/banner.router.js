const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const bannerCtrl = require("./banner.controller");
const { bannerCreateDTO } = require("./banner.validator");

const bannerRouter = require("express").Router();

// /banner
bannerRouter.route('/')
    .post(checkLogin, allowRole("admin"), uploader().single('image'), bodyValidator(bannerCreateDTO), bannerCtrl.store)   // banner create
    .get(checkLogin, allowRole("admin"), bannerCtrl.index)  // to read all the banners 

// bannerRouter.route("/:id")
//     .post() // to get a single banner by id
//     .put()  // to update a banner
//     .delete( )

module.exports = bannerRouter;