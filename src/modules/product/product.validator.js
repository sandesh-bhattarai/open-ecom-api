const Joi = require("joi");

const productCreateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(), 
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.string().allow(null, '').optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(100).optional().default(0),
    description: Joi.string().allow(null, '').optional(), 
    seller: Joi.string().allow(null, '').optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/).required()
}).unknown()


const productUpdateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(), 
    category: Joi.array().items(Joi.string()).required(),
    brand: Joi.string().allow(null, '').optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(100).optional().default(0),
    description: Joi.string().allow(null, '').optional(), 
    seller: Joi.string().allow(null, '').optional().default(null),
    status: Joi.string().regex(/^(active|inactive)$/).required()
}).unknown()

module.exports = {
    productCreateDTO,
    productUpdateDTO
}