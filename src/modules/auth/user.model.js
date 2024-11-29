const mongoose = require("mongoose");
const { statusSchema, createdBy, updatedBy } = require("../../common/schema");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        min: 2,
        max: 50, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        enum: ['admin','customer','seller'],
        default: "customer"
    },
    gender: {
        type: String, 
        enum: {
            values: ['male','female','other'],
            message: "{VALUE} is not supported"
        }
    },
    image: String,
    address: String, 
    phone: String, 
    otp: String, 
    otpExpiryTime: Date,
    status: statusSchema,
    createdBy: createdBy, 
    updatedBy: updatedBy
}, {
    timestamps: true,        /// createdAt, updatedAt
    autoCreate: true, 
    autoIndex: true
});

// Model Name: User, collection/table => users
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;