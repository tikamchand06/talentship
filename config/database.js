const mongoose = require("mongoose");

const db = "mongodb+srv://remindeme:remindeme@tcmhack.olsdl.mongodb.net/remindme?retryWrites=true&w=majority";

const connectDB = async (max_attempts = 5) => {
  const attempt = async () => {
    if (max_attempts === 0) {
      console.error("Could not connect to MongoDB");
      process.exit(1);
    }

    try {
      await mongoose.connect(db, { useNewUrlParser: true });
      console.log("MongoDB Connected ...");
    } catch (err) {
      console.error(err.message);
      console.log("retrying in 5 seconds");
      max_attempts--;
      setTimeout(attempt, 5000);
    }
  };

  await attempt();
};

module.exports = connectDB;
