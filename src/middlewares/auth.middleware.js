// TODO: Develop this middleware
const checkLogin = (req, res, next) => {
    console.log("I am inside checklogin")
    // logic => login yes or no 
    let success = false;
    
    if(success) {
        req.authUser = {
            id: 123, 
            name: "Sandesh Bhattarai",
            email: "sandesh@broadwayinfosys.com",
            password: "admin123",
            role:"Trainer",
            address: "Kathmandu"
        }
        next()
    } else {
        next({code: 401, message: "Please login First", status: "LOGIN_REQUIRED"});
    }
}

module.exports = {
    checkLogin
}