const bcrypt = require("bcryptjs");
//  פונקציה שמבצעת הצפנה(hash) של סיסמה בצורה סינכרונית(ללא הבטחות או פעולות אסינכרוניות).
const generatePassword = (password) => bcrypt.hashSync(password, 10); //10: ערך ה-"salt rounds", שמשמעותו כמה מחזורים של חישובים יבוצעו ליצירת ההצפנה. מספר גבוה יותר יגרום לחישוב להיות איטי יותר (ומאובטח יותר).

const comparePasswords = (password, cryptPassword) => {
    return bcrypt.compareSync(password, cryptPassword); //bcrypt.compareSync: פונקציה שמשווה סיסמה רגילה לסיסמה מוצפנת באופן סינכרוני.
}; //התוצאה: הפונקציה תחזיר true אם הסיסמאות תואמות, או false אם לא.

module.exports = { generatePassword, comparePasswords };