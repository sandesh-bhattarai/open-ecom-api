const categorySvc = require("./category.service");
const productSvc = require("../product/product.service")

class CategoryController {
    store = async (req, res, next) => {
        try{
            const data = await categorySvc.transformCreateRequest(req);
            // db store
            const category = await categorySvc.createCategory(data);

            res.json({
                detail: category, 
                message: "Category Created successfully",
                status: "CATEGORY_CREATE_SUCCESS",
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

            let data = await categorySvc.listAllCategory({
                skip,
                limit, 
                filter
            });
            
            const totalCount = await categorySvc.countData(filter);

            res.json({
                detail: data, 
                message: "Category List",
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
            const data = await categorySvc.getSingleByFilter({
                _id: id
            });
            res.json({
                detail: data, 
                message: "Category fetched",
                status: "FETCH_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    update = async(req, res, next) => {
        try {
            const data = await categorySvc.getSingleByFilter({
                _id: req.params.id
            })
            const transformData = await categorySvc.transformUpdateRequest(req, data);
            const response = await categorySvc.updateByFilter({
                _id: req.params.id
            }, transformData)

            res.json({
                detail: response, 
                message: "Category Updated successfully",
                status: "CATEGORY_UPDATE_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }
    delete = async(req, res, next) => {
        try {
            const data = await categorySvc.getSingleByFilter({
                _id: req.params.id
            })
            const response = await categorySvc.deleteByFilter({
                _id: req.params.id
            })
            res.json({
                detail: response, 
                message: "Category deleted successfully",
                status: "CATEGORY_DELETE_SUCCESS",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }

    getForHome = async(req, res, next) => {
        try {
            const listCategory = await categorySvc.listAllCategory({
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
                detail: listCategory, 
                message: "Category for home page",
                status: "CATEGORY_HOME",
                options: null
            })
        } catch(exception) {
            next(exception)
        }
    }
    getDetailBySlug = async(req, res, next) => {
        try {
            const categoryDetail = await categorySvc.getSingleByFilter({
                slug: req.params.slug
            })
            // product list
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page-1) * limit;

            let filter = {
                category: categoryDetail._id,
                status: "active"
            };

            if(req.query.search) {
                filter = {
                    ...filter,
                    $or: [
                        {title: new RegExp(req.query.search, 'i')},
                        {description: new RegExp(req.query.search, 'i')},
                        {status: new RegExp(req.query.search, 'i')}
                    ]
                }
            }

            let data = await productSvc.listAllProduct({
                skip: skip, 
                limit: limit, 
                filter: filter
            })
            let totalCount = await productSvc.countData(filter);
            res.json({
                detail: {
                    category: categoryDetail,
                    products: data
                },
                message: "Category Wise Product List",
                status: "CATEGORY_WISE_LIST",
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


const categoryCtrl = new CategoryController()
module.exports = categoryCtrl;