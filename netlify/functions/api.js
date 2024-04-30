const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const setRouter = require("../../apiRoutes/mdRoutes");
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(cors());
api.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

setRouter.userRoutes(api);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URL);
    console.log("Database Connection is open");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();

mongoose.connection.on("error", () => {
  console.log("Database connection error");
});

mongoose.connection.on("open", () => {
  console.log("Database Connection is open");
});

api.use((req, res, next) => {
  const error = new Error("Something went wrong");
  next(error);
});

// Error-handling Middleware
api.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Internal Server Error");
});

api.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});

module.exports.handler = serverless(api);
