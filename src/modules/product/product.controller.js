const productSvc = require("./product.service");

class ProductController {
    store = async (req, res, next) => {
        try{
            const data = await productSvc.transformCreateRequest(req);
            // db store
            const product = await productSvc.createProduct(data);

            res.json({
                detail: product, 
                message: "Product Created successfully",
                status: "PRODUCT_CREATE_SUCCESS",
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

            let data = await productSvc.listAllProduct({
                skip,
                limit, 
                filter
            });
            
            const totalCount = await productSvc.countData(filter);

            res.json({
                detail: data, 
                message: "Product List",
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

    detail = async(req, res, next) => {
        try {
            const id = req.params.id;
            const data = await productSvc.getSingleByFilter({
                _id: id
            });
            res.json({
                detail: data, 
                message: "Product fetched",
                status: "FETCH_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    update = async(req, res, next) => {
        try {
            const data = await productSvc.getSingleByFilter({
                _id: req.params.id
            })
            const transformData = await productSvc.transformUpdateRequest(req, data);
            const response = await productSvc.updateByFilter({
                _id: req.params.id
            }, transformData)

            res.json({
                detail: response, 
                message: "Product Updated successfully",
                status: "PRODUCT_UPDATE_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }
    delete = async(req, res, next) => {
        try {
            const data = await productSvc.getSingleByFilter({
                _id: req.params.id
            })
            const response = await productSvc.deleteByFilter({
                _id: req.params.id
            })
            res.json({
                detail: response, 
                message: "Product deleted successfully",
                status: "PRODUCT_DELETE_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    getForHome = async(req, res, next) => {
        try {
            const listProduct = await productSvc.listAllProduct({
                skip: 0,
                limit: 10, 
                filter: {
                    $and: [
                        {status: "active"},
                        {startDate: {$lte: new Date()}},
                        {endDate: {$gte: new Date()}}
                    ]
                }
            })
            res.json({
                detail: listProduct, 
                message: "Product for home page",
                status: "PRODUCT_HOME",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }
}


const productCtrl = new ProductController()
module.exports = productCtrl;