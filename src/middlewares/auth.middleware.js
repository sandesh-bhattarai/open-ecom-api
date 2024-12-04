require("dotenv").config();
const jwt = require("jsonwebtoken");
const authSvc = require("../modules/auth/auth.service");

const checkLogin = async (req, res, next) => {
    try {
        // verify header token 
        let token = req.headers['authorization'] || null;
        
        console.log(req.socket.remoteAddress)
        
        if(!token) {
            throw {code: 401, message: "Token required", status: "TOKEN_EXPECTED"}
        }

        // "Bearer token " => ["Bearer", "token"] ===pop()===> "token"
        token = token.split(" ").pop();

        // db check 
        // vefiy 
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // 
        if(data.typ !== 'bearer') {
            throw {code: 403, message: "Access token is expected", status: "NOT_ACCESS_TOKEN"}
        }

        // user verify 
        const user = await authSvc.getSingleUserByFilter({
            _id: data.sub
        })

        // 
        if(!user) {
            throw {code: 401, message: "User does not exist or has been already deleted.", status: "USER_NOT_FOUND"}
        }

        req.authUser = {
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            address: user.address, 
            gender: user.gender, 
            phone: user.phone,
            image: user.image,
            status: user.status
        }

        next()
    }  catch(exception) {
        // 
        if(exception.name === 'TokenExpiredError') {
            next({code: 401, message: "Token Expired", status: "TOKEN_EXPIRED"})
        } else if(exception.name === 'JsonWebTokenError') {
            next({code: 401, message: exception.message, status: "TOKEN_ERROR"})
        }
        next(exception)
    } 
}

const checkRefreshToken = async (req, res, next) => {
    try {
        // verify header token 
        let token = req.headers['refresh'] || null;
        
        if(!token) {
            throw {code: 401, message: "Refresh Token required", status: "REFRESH_TOKEN_EXPECTED"}
        }

        // "Bearer token " => ["Bearer", "token"] ===pop()===> "token"
        token = token.split(" ").pop();

        // vefiy 
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // 
        if(data.typ !== 'refresh') {
            throw {code: 403, message: "Refresh token is expected", status: "NOT_REFRESH_TOKEN"}
        }

        // user verify 
        const user = await authSvc.getSingleUserByFilter({
            _id: data.sub
        })

        // 
        if(!user) {
            throw {code: 401, message: "User does not exist or has been already deleted.", status: "USER_NOT_FOUND"}
        }

        req.authUser = {
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            address: user.address, 
            gender: user.gender, 
            phone: user.phone,
            image: user.image,
            status: user.status
        }

        next()
    }  catch(exception) {
        // 
        if(exception.name === 'TokenExpiredError') {
            next({code: 401, message: "Token Expired", status: "TOKEN_EXPIRED"})
        } else if(exception.name === 'JsonWebTokenError') {
            next({code: 401, message: exception.message, status: "TOKEN_ERROR"})
        }
        next(exception)
    } 
}

module.exports = {
    checkLogin,
    checkRefreshToken
}