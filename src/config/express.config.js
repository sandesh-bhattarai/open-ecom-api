const express = require("express");
const cors = require("cors");

// load/connect mongodb
require("./db.config");

// import router 
const apiRouter = require("../router/router")

const app = express();

// cors allowed
app.use(cors())

// body parsers 
app.use(express.json()) //json parser
app.use(express.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    next()
})

// router mount 
// http://localhost:9005/api/v1
app.use('/api/v1', apiRouter);
// app.use("/api/v2", apiRouter);


// 404 
app.use((req, res, next) => {
    next({code: 404, message: "Not found", status: "NOT_FOUND"});
})


// error handling middleware 
app.use((error, req, res, next) => {
    let code = error.code || 500;
    let detail = error.detail || {}
    let message = error.message || "Internal Server Error";
    let status = error.status || "INTERNAL_SERVER_ERROR";
    
    // uniqueness validation failed 
    if(+error.code === 11000) {
        code = 400
        status = 'VALIDATION_FAILED'
        
        // {keyPattern: {email: 1, name: 1}} => ['email', 'name']
        Object.keys(error.keyPattern).map((key) => {
            detail[key] = `${key} should be unique`
        })
        message = "Validation failed";
    }

    console.log(error)
    res.status(code).json({
        data: detail,
        message: message,
        status: status,
        options: null
    })
})
module.exports = app

// no execution