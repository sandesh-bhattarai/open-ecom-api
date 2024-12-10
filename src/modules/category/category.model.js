const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const CategorySchema = new mongoose.Schema({
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
    parentId: {
        type: mongoose.Types.ObjectId, 
        ref: "Category",
        default: null
    },
    image: {
        type: String, 
    },
    ...commonStr
}, schemaOpts);

const CategoryModel = mongoose.model("Category", CategorySchema)  // Categorys

module.exports = CategoryModel