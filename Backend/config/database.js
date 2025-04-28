const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit the process if connection fails
    }
};

module.exports = connectDatabase;
