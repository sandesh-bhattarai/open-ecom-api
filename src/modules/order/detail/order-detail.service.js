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

    updateCartByFilter = async(filter, updateData) => {
        try {
            const updatedBody = await OrderDetailModel.updateMany(filter, {$set: updateData});
            return updatedBody;
        } catch(exception) {
            console.log("updateSingleCart", exception);
            throw exception;
        }
    }

    deleteFromCart = async(cartId) => {
        try {
            const removed = await OrderDetailModel.findByIdAndDelete(cartId);
            if(!removed) {
                throw {code: 404, message: "Cart does not exists anymore", status: "CART_DOES_NOT_EXISTS"}
            }
            return removed;
        } catch(exception) {
            console.log("deleteFromCart", exception);
            throw exception;
        }
    }
}

const orderDetailSvc = new OrderDetailService()
module.exports = orderDetailSvc;