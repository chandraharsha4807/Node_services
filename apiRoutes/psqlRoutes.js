const dbQueries = require("../queries/psqlQueries");

const userRoutes = (app) => {
  app.get("/users", dbQueries.getUsers);
  app.get("/users/:id", dbQueries.getUserById);
  app.post("/users", dbQueries.createUser);
  app.put("/users/:id", dbQueries.updateUser);
  app.delete("/users/:id", dbQueries.deleteUser);
};


module.exports = {
    userRoutes
}