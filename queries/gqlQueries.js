const userSchema = require("../schemas/mdSchema");

const getUsers = async () => {
  try {
    const data = await userSchema.find();
    return data;
  } catch (e) {
    return e;
  }
};


module.exports = {
  getUsers,
};
