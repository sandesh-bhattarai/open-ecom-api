class AuthController {
    register = (req, res, next) => {
        // body parser 
        let data = req.body;
        let file = req.file;    // single upload
        let files = req.files;  // files 
        
        // db store 
        // notify 
        // client response 
        res.json({
            data: {data, file, files}, 
            message: "Register Data",
            status: "REGISTER_DATA",
            options: null
        })
    }

    login = (req, res, next) => {

    }
}


const authCtrl = new AuthController()
module.exports = authCtrl