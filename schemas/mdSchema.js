const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
