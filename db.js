require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected!");
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

module.exports = connectDB;

connectDB();
