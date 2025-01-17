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

    transformUpdateRequest = async(req, bannerData) => {
        try {
            let data = req.body;
            
            if(req.file) {
                data.image = await fileUploadSvc.uploadFile(req.file.path, '/banner')
            } else {
                data.image = bannerData.image
            }

            data.updatedBy = req.authUser._id;
            return data;
        } catch(exception) {
            console.log("transformUpdateRequest", exception)
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
                        .populate("createdBy", ["_id","name",'email','status'])    
                        .populate("updatedBy", ["_id","name",'email','status'])
                        .sort({_id: -1})
                        .skip(skip)
                        .limit(limit);
            return data; 
        } catch(exception) {
            console.log("listALlBanner", exception)
            throw exception;
        }
    }

    getSingleByFilter = async(filter) => {
        try {
            const data = await BannerModel.findOne(filter)
                        .populate("createdBy", ["_id","name",'email','status'])    
                        .populate("updatedBy", ["_id","name",'email','status']);
            if(!data) {
                throw {code: 404, message: "Banner does not exists", status: "BANNER_NOT_FOUND"}
            }
            return data; 
        } catch(exception) {
            console.log("getSingleByFilter", exception)
            throw exception;
        }
    }
    
    updateByFilter = async(filter, updateData) => {
        try {
            const resp = await BannerModel.findOneAndUpdate(filter, {$set: updateData});
            return resp;
        } catch(exception)  {
            console.log("updateByFilter", exception)
            throw exception
        }
    }

    deleteByFilter = async(filter) => {
        try {
            const resp = await BannerModel.findOneAndDelete(filter);
            return resp;
        } catch(exception)  {
            console.log("deleteByFilter", exception)
            throw exception
        }
    }
}

const bannerSvc = new BannerService()
module.exports  = bannerSvc;