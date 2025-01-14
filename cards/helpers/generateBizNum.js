//מה אנחנו עושים?
// אנחנו מייצרים מספר ייחודי לכל כרטיס חדש במערכת(מספר ביזנס - bizNumber), ובודקים שהוא לא קיים כבר במאגר.הקוד נועד להבטיח שהמספרים יהיו ייחודיים ושלא ייווצרו התנגשויות.
const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNum = async () => {
    let cardCount = await Card.countDocuments();
    if (cardCount === 8_999_999) { //אם המערכת כבר יצרה את המספר המקסימלי האפשרי של כרטיסים (8,999,999), אנחנו עוצרים וזורקים שגיאה.
        const error = new Error("You reched to maximum cards count in your system");
        error.status = 507;
        return createError("mongoose", error);
    }

    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await checkBizNumberExsist(random));

    return random;
};

const checkBizNumberExsist = async (bizNumber) => { //הפונקציה הזו בודקת אם מספר מסוים כבר קיים במערכת:
    try {
        const bizNumberExsist = await Card.findOne({ bizNumber }); //משתמשים בשאילתה findOne כדי לבדוק אם יש כרטיס עם אותו bizNumber באוסף ה-"cards" במסד הנתונים.
        return Boolean(bizNumberExsist);
    } catch (error) {
        error.status = 500;
        return createError("mongoose", error);
    }
};

module.exports = { generateBizNum };