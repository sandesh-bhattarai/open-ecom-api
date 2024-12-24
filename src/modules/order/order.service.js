const OrderModel = require("./order.model");
const TransactionModel = require("./transactions/transaction.model");

class OrderService {
    createOrder = async(data) => {
        try {
            const orderObj = new OrderModel(data);
            return await orderObj.save()
        } catch(exception) {
            throw exception;
        }
    }

    getSingleOrderByFilter = async(filter) => {
        try {
            const orderDetail = await OrderModel.findOne(filter)
            // 
            if(!orderDetail) {
                throw {code: 400, message: "Order not found", status: "ORDER_NOT_FOUND"}
            }
            return orderDetail
        } catch(exception) {
            throw exception;
        }
    }

    populateTransaction = async (transactiondata)=> {
        try {
            const transactionObj = new TransactionModel(transactiondata)
            return await transactionObj.save();
        } catch(exception) {
            console.log("populateTransaction", exception)
            throw exception;
        }
    }

    updateOneOrderByfilter= async(filter, data) => {
        try {
            const response = await OrderModel.findOneAndUpdate(filter, {$set: data}, {new: true});
            return response;
        }catch(exception) {
            console.log("updateOneOrderByfilter", exception)
            throw exception
        }
    }

    getAllOrderByFilter = async(filter) => {
        try {
            let data = await OrderModel.find(filter)
                .populate("buyer", ['_id','name','email','phone'])
            return data
        }catch(exception) {
            console.log("getAllOrderByFilter", exception)
            throw exception
        }
    }
}

const orderSvc = new OrderService()
module.exports = orderSvc;