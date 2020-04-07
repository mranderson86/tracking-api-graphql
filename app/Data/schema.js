"use strict";

const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

// Define our schema using the GraphQL schema language
const typeDefs = `
  input Tracking {
    technology_id: Int!
  }
  type User {
    id: Int!
    username: String!
    email: String!
    technologies: [Technology]
  }
  type Technology {
    id: Int!
    technology: String!
    users: [User]
  }
  type CheckIn {
    id: Int!
    technology_id: Int!
    user_id: Int!
  }
  type Query {
    allUsers: [User]
    currentUser: User
    fetchUser(id: Int!): User
    allTechnologies: [Technology]
    fetchTechnology(id: Int!): Technology
  }
  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
    createTechnology (technology: String!): Technology
    createTracking (technologies:[Tracking!]): [CheckIn]
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
