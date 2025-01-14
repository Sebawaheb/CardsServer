const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");
const config = require("config");

// const tokenGenerator = "jwt";
const tokenGenerator = config.get("TOKEN_GENERATOR")


const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {//תנאי שמוודא שסוג ה-Token Generator הוא "jwt".
        try {
            const tokenFromClient = req.header("x-auth-token");

            if (!tokenFromClient) { //בודק אם אין טוקן שנשלח על ידי הלקוח
                const error = new Error("Please Login");
                error.status = 401;
                return createError("Authentication", error);
            }

            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {  //בודק אם הטוקן לא תקין או פג תוקף (במקרה הזה, verifyToken מחזיר null).
                const error = new Error("Unauthorized user");
                error.status = 401;
                return createError("Authentication", error);
            }

            req.user = userInfo; //מאחסן את פרטי המשתמש המפוענחים בבקשה (req).
            return next(); //ממשיך את הזרימה ל-Middleware הבא או לטיפול בבקשה.
        } catch (error) {
            return handleError(res, 401, error.message);
        }
    }
    return handleError(res, 500, "The server not used valid token generator");
};

module.exports = auth;










