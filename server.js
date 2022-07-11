require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/database");

const app = express();
const corsOptions = { origin: process.env.REACT_APP_URL, optionsSuccessStatus: 200 };

//Connect MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false, limit: "50mb", parameterLimit: 50000 }));

// Add headers
app.use(cors(corsOptions));
app.options("*", cors());

app.get("/", (req, res) => res.send("Hello World!"));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/reminders", require("./routes/reminder"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

module.exports = app;
