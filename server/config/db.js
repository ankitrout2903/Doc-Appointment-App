const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected'.green.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.green.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
