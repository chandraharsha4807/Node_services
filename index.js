const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const setRouter = require("./apiRoutes/mdRoutes");
const schema = require("./resolvers/resolver");
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

setRouter.userRoutes(app);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URL);
    console.log("Database Connection is open");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});

app.use(
  "/graphql/users",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  const error = new Error("Something went wrong");
  next(error);
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Internal Server Error");
});
