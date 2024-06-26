const dbQueries = require("../queries/mdQueries");

const userRoutes = (app) => {
  app.post("/signup", dbQueries.registerUser);
  app.post("/login", dbQueries.loginUser);
  app.post("/login/forgot", dbQueries.forgotPassword);
  app.post("/user/update", dbQueries.forgotPassword)
  app.get("/users", dbQueries.getUsers);
  app.get("/users/:id", dbQueries.getUserById);
  app.post("/user/create", dbQueries.createUser);
  app.put("/user/:id/update", dbQueries.updateUser);
  app.delete("/user/delete", dbQueries.deleteUser);
};

module.exports = {
  userRoutes,
};
