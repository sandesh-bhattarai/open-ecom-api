const express = require("express");
// import router 
const apiRouter = require("../router/router")

const app = express();

// router mount 
app.use(apiRouter);

module.exports = app

// no execution