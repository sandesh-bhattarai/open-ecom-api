const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String, 
        min: 3, 
        max: 100,
        required: true
    },
    slug: {
        type: String, 
        unique: true, 
        required: true
    },
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null
    },
    price: {
        type: Number,
        requried: true, 
        min: 100
    },
    discount: {
        type: Number, 
        min: 0,
        max: 100
    },
    actualAmt: {
        type: Number, 
        required: true
    },
    description: {
        type: String
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    images: [{
        type: String
    }],
    ...commonStr
}, schemaOpts);

const ProductModel = mongoose.model("Product", ProductSchema)  // banners

module.exports = ProductModel