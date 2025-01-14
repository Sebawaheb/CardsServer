const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_WORD = process.env.SECRET; //זוהי המילה הסודית שמשמשת להצפנה ולפענוח של הטוקנים.


const generateAuthToken = (user) => {
    const payload = { //Payload הוא אובייקט המכיל מידע על המשתמש. מידע זה "מקודד" לתוך הטוקן.
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        date: new Date(),
    };
    const token = jwt.sign(payload, SECRET_WORD);
    return token;
};

//לבדוק אם הטוקן שנשלח מהלקוח תקין ולפענח את המידע שבו.
const verifyToken = (tokenFromClient) => {
    try {
        const payload = jwt.verify(tokenFromClient, SECRET_WORD); //תפקידה הוא לבדוק אם הטוקן (tokenFromClient) תקין ולפענח את המידע שבו.
        return payload;
    } catch (error) {
        return null; //אם הטוקן אינו תקין או פג תוקף, הפונקציה מחזירה null.
    }
};

module.exports = { generateAuthToken, verifyToken };