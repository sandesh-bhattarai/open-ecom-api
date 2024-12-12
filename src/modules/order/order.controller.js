const productSvc = require("../product/product.service");
const orderDetailSvc = require("./detail/order-detail.service");

class OrderController {
    addToCart = async(req, res, next) => {
        try {
            const {productId, quantity} = req.body;
            const loggedInUser = req.authUser; 
            
            const productDetail = await productSvc.getSingleByFilter({
                _id: productId,
                status: 'active'
            })

            // productId exists cart 
            const exists = await orderDetailSvc.getSingleCartByFilter({
                orderId: null,
                buyer: loggedInUser._id, 
                product: productId
            });

            let cart = null;

            if(exists) {
                // already exists product in cart
                let qty = +quantity + +exists.quantity;
                const updateBody = {
                    quantity: qty,
                    price: productDetail.actualAmt,
                    totalAmt: productDetail.actualAmt * qty
                }
                cart = await orderDetailSvc.updateSingleCart(exists._id, updateBody);
                res.json({
                    detail: cart, 
                    message: "Product Updated in the cart",
                    stauts: "ADD_TO_CART_SUCCESS",
                    options: null
                })
            } else {
                // new product to add in cart 
                let orderDetail = {
                    orderId: null, 
                    buyer: loggedInUser._id, 
                    product: productDetail._id,
                    price: productDetail.actualAmt,
                    quantity: quantity, 
                    totalAmt: (productDetail.actualAmt * quantity),
                    status: "cart", 
                    seller: productDetail?.seller?._id, 
                    createdBy: loggedInUser._id
                }
                cart = await orderDetailSvc.createCart(orderDetail);
                res.json({
                    detail: cart, 
                    message: "Product added in the cart",
                    stauts: "ADD_TO_CART_SUCCESS",
                    options: null
                })
            }
        } catch(exception) {
            next(exception)
        }
    }

    myCart = async (req, res, next) => {
        try {
            let filter = {
                orderId: null
            }
            let loggedInUser = req.authUser;

            if(loggedInUser === 'customer') {
                filter = {
                    ...filter,
                    buyer: loggedInUser._id
                }
            }

            const data = await orderDetailSvc.getAllCartByFilter(filter);
            res.json({
                detail: data, 
                message: "Your cart",
                status: "YOUR_CART",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const orderCtrl = new OrderController()
module.exports = orderCtrl;