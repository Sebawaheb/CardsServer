const mongoose = require('mongoose');

const connectionStringForMongoDB = process.env.MONGODB_CONNECTION_STRING;
if (!connectionStringForMongoDB) {
    console.error(" MONGODB_CONNECTION_STRING is missing!");
    process.exit(1); // עוצר את השרת אם אין חיבור
}

const connectToLocalDB = async () => {
    try {
        await mongoose.connect(connectionStringForMongoDB);
        console.log('Connected to MongoDB locally');
    } catch (error) { console.log('Error connecting to MongoDB:', error); }
};

module.exports = connectToLocalDB;
