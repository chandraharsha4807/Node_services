const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { Router } = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const setRouter = require("../../apiRoutes/mdRoutes");
const schema = require("../../resolvers/resolver");
const api = express();

dotenv.config();

api.use(bodyParser.json());
api.use(cors());
api.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = Router();

setRouter.userRoutes(router);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URL);
    console.log("Database Connection is open");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();

api.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});

api.use("/api/", router);

app.use(
  "/api/graphql/users",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports.handler = serverless(api);
