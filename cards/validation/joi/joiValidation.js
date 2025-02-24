const Joi = require("joi");
const { zip } = require("lodash");

const joiValidateCard = (card) => {
    const urlRegex = //urlRegex: ביטוי רגולרי שמשמש לבדוק אם URL הוא תקין (כלומר, כתובת אינטרנט תקינה).
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        phone: Joi.string()
            .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
            .rule({ message: "Card phone must vu a valid phone number" })
            .required(),
        email: Joi.string()
            .ruleset.pattern( //pattern: ביטוי רגולרי לאימות פורמט של אימייל.
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            )
            .rule({ message: "Card email must br a valid email" })
            .required(),
        web: Joi.string()
            .ruleset.regex(urlRegex)
            .rule({ message: "card web mast be a valid url" })
            .allow(""),
        image: Joi.object()
            .keys({
                url: Joi.string()
                    .ruleset.regex(urlRegex)
                    .rule({ message: "Card image must be a calid url" })
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        Address: Joi.object().keys({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        }),
    }).required;

    return schema.validate(card); //הפונקציה validate משתמשת בסכמה כדי לבדוק אם הנתונים שסיפקת (card) תואמים לתנאים שהגדרת.
};

module.exports = joiValidateCard;