import Joi from 'joi'

export const SchemaValidation = Joi.object({
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number().default(3000),
    DEFAULT_ADMIN_PASSWORD: Joi.string().min(6).required(),
})
