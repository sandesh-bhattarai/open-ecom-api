const Joi = require("joi");

const registerDataDTO = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Name should not be empty"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email should not be empty"
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[a-zA-Z\d!@#$%&*_-]{8,15}$/).required().messages({
        "string.empty": "Password should not be empty",
        "string.pattern.base": "Password should contain atleast one Capital Letter,one Small Letter, one digit and a special Character"
    }),  // TODO: Validate strong password
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "string.empty": "confirmPassword should not be empty",
        "any.only": "confirmPassword should match password"
    }),
    role: Joi.string().regex(/^(customer|seller)$/).default("customer"),         //customer, seller, 
    gender: Joi.string().regex(/^(male|female|other)$/).required().messages({
        "string.pattern.base": "Gender should be either male or female or other. "
    }),
    address: Joi.string().optional(),
    phone: Joi.string().optional()
})


const loginDTO = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().required()
})

module.exports = {
    registerDataDTO,
    loginDTO
}