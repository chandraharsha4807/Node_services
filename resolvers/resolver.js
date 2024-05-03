const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const dbQueries = require("../queries/gqlQueries");

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers: {
      type: new GraphQLList(userType),
      resolve: async () => {
        try {
          const users = await dbQueries.getUsers();
          return users;
        } catch (error) {
          throw new Error("Failed to fetch users");
        }
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        userName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        status: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, args) => {
        try {
            const data = await dbQueries.createUser({ body: args });
          return data;
        } catch (e) {
          throw new Error("Failed to fetch users");
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
