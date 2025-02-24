const Joi = require('joi');

const updateValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256).required(),
                middle: Joi.string().min(2).max(256).allow(""),
                last: Joi.string().min(2).max(256).required(),
            })
            .required(),
        phone: Joi.string()
            .ruleset.regex(/0[0-9]{2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
            .rule({ message: 'Must be a valid phone number' })
            .required(),
        image: Joi.object()
            .keys({
                url: Joi.string()
                    .regex(
                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                    )
                    .message("User image must be a valid url")
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        Address: Joi.object()
            .keys({
                state: Joi.string().allow(""),
                country: Joi.string().required(),
                city: Joi.string().required(),
                street: Joi.string().required(),
                houseNumber: Joi.number().required(),
                zip: Joi.number(),
            })
            .required()
    });
    return schema.validate(user);
};

const validateUpdate = (user) => {
    const { error } = updateValidation(user);
    if (error) return error.details[0].message;
    return "";
};

module.exports = validateUpdate;