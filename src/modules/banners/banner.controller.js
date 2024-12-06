const bannerSvc = require("./banner.service");

class BannerController {
    store = async (req, res, next) => {
        try{
            const data = await bannerSvc.transformCreateRequest(req);
            // db store
            const banner = await bannerSvc.createBanner(data);

            res.json({
                detail: banner, 
                message: "Banner Created successfully",
                status: "BANNER_CREATE_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    index = async(req, res, next) => {
        try {
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page-1) * limit;

            let filter = {};

            if(req.query.search) {
                filter = {
                    $or: [
                        {title: new RegExp(req.query.search, 'i')},
                        {status: new RegExp(req.query.search, 'i')}
                    ]
                }
            }

            let data = await bannerSvc.listAllBanner({
                skip,
                limit, 
                filter
            });
            
            const totalCount = await bannerSvc.countData(filter);

            res.json({
                detail: data, 
                message: "Banner List",
                status: "LISTING_SUCCESS",
                options: {
                    currentPage: page,
                    limit: limit, 
                    totalData: totalCount
                }
            })
        } catch(exception) {
            next(exception)
        }
    }
}


const bannerCtrl = new BannerController()
module.exports = bannerCtrl;