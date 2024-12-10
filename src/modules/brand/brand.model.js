const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const BrandSchema = new mongoose.Schema({
    title: {
        type: String, 
        min: 3, 
        unique: true,
        max: 100,
        required: true
    },
    slug: {
        type: String, 
        required: true, 
        unique: true
    },
    image: {
        type: String, 
    },
    ...commonStr
}, schemaOpts);

const BrandModel = mongoose.model("Brand", BrandSchema)  // Brands

module.exports = BrandModel