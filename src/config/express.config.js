const express = require("express");
// import router 
const apiRouter = require("../router/router")

const app = express();

app.use((req, res, next) => {
    next()
})

// router mount 
// http://localhost:9005/api/v1
app.use('/api/v1', apiRouter);
// app.use("/api/v2", apiRouter);

module.exports = app

// no execution