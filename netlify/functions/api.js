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

api.get("/", (req, res) => {
  res.send("hello world");
});

setRouter.userRoutes(api);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ganivadaharsha998:Welcome1@chandradb.h2lzfzb.mongodb.net/"
    );
    console.log("Database Connection is open");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();

api.listen("3000", () => {
  console.log(`App running on port 3000.`);
});

module.exports.handler = serverless(api);
