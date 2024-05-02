const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  status: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
