
const express = require('express');
const Card = require('./cards/models/mongodb/Card');
const PORT = process.env.PORT || 8181;
const connectToDB = require('./DB/dbService');
const chalk = require('chalk');
require('dotenv').config();
const app = express();
const router = require('./router/router');
const corsMiddleware = require('./middlewares/cors');
const morganLogger = require('./logger/morganLogger');
const { generateTestCards, generateTestUsers } = require("./initializeDatabase.js");
const User = require('./users/models/mongodb/User.js');

app.use(express.json());
app.use(morganLogger);
app.use(corsMiddleware);

app.use(router);

async function initializeDatabase() {
    const seedUsers = await generateTestUsers();
    await User.insertMany(seedUsers);
    await Card.insertMany(generateTestCards);
}

app.listen(PORT, async () => {
    console.log(chalk.bgGreen(`Server is running on port ${PORT}`));
    connectToDB();
    const dbUsers = await User.find({});
    const dbCards = await Card.find({});
    if (dbUsers.length === 0 && dbCards.length === 0) {
        initializeDatabase();
    }
});