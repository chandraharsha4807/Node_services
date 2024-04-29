// With postgres DB

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const setRouter = require("./apiRoutes/psqlRoutes");

const app = express();

setRouter.userRoutes(app);

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
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

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});
