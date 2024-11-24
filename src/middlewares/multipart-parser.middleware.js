const multer = require("multer");

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = "./public/"
        cb(null, path)
    },
    filename: (req, file, cb) => {
        let filename = file.originalname;
        cb(null, filename);
    }
})
// file size, type 

// file upload uplaod cloudinary
const uploader = (type = 'image') => {
    let allowed = [];

    if(type === 'image') {
        allowed = ['jpg','jpeg','png','gif','svg','webp', 'bmp']
    } else if(type === 'doc') {
        allowed = ['doc','pdf','ppt','csv','xlsx','txt','json']
    }

    return multer({
        storage: myStorage,
        fileFilter: (req, file, cb) => {
            // type 
            // filename => "filename.ext".split(".") => ["filename",'ext'].pop()=> 'ext
            let ext = file.originalname.split(".").pop()
            if(allowed.includes(ext)) {
                // ok 
                // console.log("I am here")
                cb(null, true)
            } else {
                cb({code: 400, message: "File format not supported", status: "INVALID_FILE_FORMAT", detail: {
                    [file.fieldname]: "File format not supported"
                }})
            }
        },
        limits: {
            fileSize: 3000000
        }
    })
}

module.exports = uploader