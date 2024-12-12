const OrderDetailModel = require("./order-detail.model");

class OrderDetailService {
    getSingleCartByFilter = async(filter) => {
        try {
            const cart = await OrderDetailModel.findOne(filter)
                            .populate("buyer", ['_id','name','email','phone','address','image'])
                            .populate("product", ["_id",'title','price','discount', 'actualAmt', 'slug'])
            return cart;
        } catch(exception) {
            console.log("getSingleCartByFilter", exception)
            throw exception;
        }
    }

    getAllCartByFilter = async (filter) => {
        try {
            const cart = await OrderDetailModel.find(filter)
                            .populate("buyer", ['_id','name','email','phone','address','image'])
                            .populate("product", ["_id",'title','price','discount', 'actualAmt', 'slug'])
            return cart;
        } catch(exception) {
            console.log("getSingleCartByFilter", exception)
            throw exception;
        }
    }

    createCart = async(data) => {
        try {
            const cartObj = new OrderDetailModel(data);
            return await cartObj.save();
        } catch(exception) {
            console.log("createCart", exception);
            throw exception;
        }
    }

    updateSingleCart =  async(cartId, updateData) => {
        try {
            const updatedBody = await OrderDetailModel.findByIdAndUpdate(cartId, {$set: updateData}, {new: true});
            return updatedBody;
        } catch(exception) {
            console.log("updateSingleCart", exception);
            throw exception;
        }
    }
}

const orderDetailSvc = new OrderDetailService()
module.exports = orderDetailSvc;