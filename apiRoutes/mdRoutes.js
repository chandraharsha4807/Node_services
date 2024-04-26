const dbQueries = require("../queries/mdQueries");

const userRoutes = (app) => {
  app.get("/users", dbQueries.getUsers);
  app.get("/users/:id", dbQueries.getUserById);
  app.post("/user/create", dbQueries.createUser);
  app.put("/user/:id/update", dbQueries.updateUser);
  app.delete("/user/delete", dbQueries.deleteUser);
};

module.exports = {
  userRoutes,
};
