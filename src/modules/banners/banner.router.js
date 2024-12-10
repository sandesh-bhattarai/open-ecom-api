const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const bannerCtrl = require("./banner.controller");
const { bannerCreateDTO, bannerUpdateDTO } = require("./banner.validator");

const bannerRouter = require("express").Router();

bannerRouter.get('/home-banner', bannerCtrl.getForHome)

// /banner
bannerRouter.route('/')
    .post(checkLogin, allowRole("admin"), uploader().single('image'), bodyValidator(bannerCreateDTO), bannerCtrl.store)   // banner create
    .get(checkLogin, allowRole("admin"), bannerCtrl.index)  // to read all the banners 

bannerRouter.route("/:id")
    .get(checkLogin, allowRole('admin'), bannerCtrl.detail) // to get a single banner by id
    .patch(checkLogin, allowRole("admin"), uploader().single("image"), bodyValidator(bannerUpdateDTO), bannerCtrl.update)  // to update a banner
    .delete(checkLogin, allowRole("admin"), bannerCtrl.delete)

module.exports = bannerRouter;