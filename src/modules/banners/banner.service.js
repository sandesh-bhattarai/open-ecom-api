const fileUploadSvc = require("../../services/fileuploader.service");
const BannerModel = require("./banner.model");

class BannerService {
    transformCreateRequest = async(req) => {
        try {
            let data = req.body;
            
            if(!req.file) {
                throw {code: 400, detail: {image: "Image is required"}, message: "Validation Failed", status: "VALIDATION_FAILED"}
            } else {
                data.image = await fileUploadSvc.uploadFile(req.file.path, '/banner')
            }

            data.createdBy = req.authUser._id;
            return data;
        } catch(exception) {
            console.log("transformCreateRequest", exception)
            throw exception
        }
    }

    createBanner = async(data)=>{
        try {
            const bannerObj = new BannerModel(data)
            return await bannerObj.save();
        } catch(exception) {
            console.log("createBanner", createBanner)
            throw exception
        }
    }

    countData = async(filter = {}) => {
        try {
            return await BannerModel.countDocuments(filter)
        }catch(exception) {
            cnosole.log("CountData", exception)
            throw exception
        }
    }

    listAllBanner = async({skip=0, limit=10, filter={}}) => {
        try{
            let data = await BannerModel.find(filter)
                                .sort({_id: -1})
                                .skip(skip)
                                .limit(limit);
            return data; 
        } catch(exception) {
            console.log("listALlBanner", exception)
            throw exception;
        }
    }
}

const bannerSvc = new BannerService()
module.exports  = bannerSvc;