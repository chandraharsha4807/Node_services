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
      name: request.body.userName,
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
      name: request.body.userName,
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
    const userId = request.body.id;
    const data = await userSchema.findByIdAndDelete(userId);
    response.send(data);
  } catch (e) {
    response.send(e);
  }
};

const registerUser = async (request, response) => {
  try {
    const { email } = request.body;
    const matchedData = await userSchema.findOne({ email });

    if (!matchedData) {
      createUser(request, response);
    } else {
      response
        .status(422)
        .send({ status: "FAILED", message: "User already exists" });
    }
  } catch (e) {
    response.send(e);
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const matchedData = await userSchema.findOne({ email });
    if (matchedData) {
      if (matchedData.password === password) {
        response
          .status(200)
          .send({ status: "SUCCESS", message: "Login success" });
      } else {
        response
          .status(401)
          .send({ status: "FAILED", message: "Incorrect password" });
      }
    } else {
      response
        .status(404)
        .send({ status: "FAILED", message: "User doesn't exists" });
    }
  } catch (e) {
    response.send(e);
  }
};

const forgotPassword = async (request, response) => {
  try {
    const { email, password } = request.body;
    const matchedData = await userSchema.findOne({ email });

    if (matchedData) {
      const updatedUser = {
        name: matchedData.userName,
        userName: matchedData.userName,
        email: email,
        password: password,
        status: request.body.status,
      };
      await userSchema.findByIdAndUpdate(matchedData.id, updatedUser);
      response
        .status(200)
        .send({ status: "SUCCESS", message: "Password updated successfully" });
    } else {
      response
        .status(404)
        .send({ status: "FAILED", message: "User doesn't exists" });
    }
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
  registerUser,
  loginUser,
  forgotPassword,
};
