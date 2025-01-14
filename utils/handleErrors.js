const chalk = require("chalk"); //המודול chalk הוא ספרייה ב-JavaScript (שמשתמשים בה בעיקר עם Node.js) המאפשרת להוסיף צבעים, עיצובים, והדגשות לטקסטים בקונסולה (Terminal).

const createError = (validator, error) => {
    error.message = `${validator} Error: ${error.message}`;
    error.status = error.status || 400;
    throw new Error(error);
};

const handleError = (res, status, message = "") => {
    console.log(chalk.bgYellowBright.red(message));
    return res.status(status).send(message);
};

module.exports = { createError, handleError };