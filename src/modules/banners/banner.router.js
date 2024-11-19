const bannerRouter = require("express").Router();

// CRUD 
// Create 
// /banner

bannerRouter.route('/')
    .post((req, res, next) => {})   // banner create
    .get((req, res, next) => {})  // to read all the banners 

// bannerRouter.post("/",(req, res, next) => {})   // banner create
// Read 
// bannerRouter.get("/",(req, res, next) => {})  // to read all the banners 

bannerRouter.route("/:id")
    .post((req, res, next) => {}) // to get a single banner by id
    .put((req, res, next) => {})  // to update a banner
    .delete( (req, res, next) => {})

module.exports = bannerRouter;