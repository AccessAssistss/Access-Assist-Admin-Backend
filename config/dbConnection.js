const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database Connected successfully!");
  } catch (err) {
    console.error("Error connecting to database: ", err);
    console.log("Connection String:", process.env.CONNECTION_STRING);
    process.exit(1);
  }
};

module.exports = connectDB;
