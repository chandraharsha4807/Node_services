const mongoose = require("mongoose");
const userSchema = require("../schemas/mdSchema");

const getUsers = async (request, response) => {
  try {
    const data = await userSchema.find();
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

const getUserById = async (request, response) => {
  try {
    const userId = request.params.id;
    const data = await userSchema.findById(userId);
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

const createUser = async (request, response) => {
  try {
    const newUser = {
      userName: request.body.userName,
      email: request.body.email,
      password: request.body.password,
      status: request.body.status,
    };
    const data = await new userSchema(newUser).save();
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

const updateUser = async (request, response) => {
  try {
    const userId = request.params.id;
    const updatedUser = {
      userName: request.body.userName,
      email: request.body.email,
      password: request.body.password,
      status: request.body.status,
    };
    const data = await userSchema.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

const deleteUser = async (request, response) => {
  try {
    console.log(request.body.id);
    const userId = request.body.id;
    const data = await userSchema.findByIdAndDelete(userId);
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
