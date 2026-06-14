const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.SKIP_DB === "true") {
      console.log("MongoDB skipped: backend running without database");
      return;
    }

    if (!process.env.MONGO_URI) {
      console.log("MONGO_URI missing: backend running without database");
      return;
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.log("Backend will continue without database for now");
  }
};

module.exports = connectDB;