const mongoose = require("mongoose");

const statusSchema ={
    type: String, 
    enum: ['active','inactive'],
    default: "inactive"
}

const createdBy = {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
}

const updatedBy = {
    type: mongoose.Types.ObjectId,
    ref: "User",        // _id => ObjectId
    default: null
}

const commonStr ={
    status: statusSchema,
    createdBy: createdBy,
    updatedBy: updatedBy
}

module.exports = {
    statusSchema,
    createdBy, 
    updatedBy,
    commonStr
}