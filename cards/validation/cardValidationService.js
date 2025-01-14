const joiValidateCard = require("./joi/joiValidationCard"); //מה עושה joiValidateCard: זוהי פונקציה שמשתמשת ב-Joi (ספריית אימות נתונים) כדי לבדוק אם כרטיס (card) מתאים לכללים שהוגדרו מראש.
const config = require("config")
const validator = config.get("VALIDATOR")



// const validator = "Joi";

const validateCard = (card) => {
    if (validator === "Joi") { //כאן נבדק אם המשתנה validator מכוון לערך "Joi".
        // המשמעות היא שהפונקציה תשתמש ב - Joi כדי לבצע את האימות(כרגע זו האפשרות היחידה).
        const { error } = joiValidateCard(card);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = validateCard;