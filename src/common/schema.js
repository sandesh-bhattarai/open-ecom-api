const mongoose = require("mongoose");

const statusSchema =new mongoose.Schema({
    type: String, 
    enum: ['active','inactive'],
    default: 'inactive'
})

const createdBy = new mongoose.Schema({
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
})

const updatedBy = new mongoose.Schema({
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
})

module.exports = {
    statusSchema,
    createdBy, 
    updatedBy
}