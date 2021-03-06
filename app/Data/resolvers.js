"use strict";

const User = use("App/Models/User");
const Technology = use("App/Models/Technology");
const CheckIn = use("App/Models/CheckIn");
const slugify = require("slugify");

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers(_, { ctx }, { auth }) {
      await auth.check();

      const users = await User.all();
      return users.toJSON();
    },
    // Get a user by its ID
    async fetchUser(_, { id }, { auth }) {
      await auth.check();

      const user = await User.find(id);
      return user.toJSON();
    },
    // Fetch all technologies
    async allTechnologies(_, ctx, { auth }) {
      await auth.check();

      const technologies = await Technology.all();
      return technologies.toJSON();
    },
    // Get a technology by its ID
    async fetchTechnology(_, { id }, { auth }) {
      await auth.check();

      const technology = await Technology.find(id);
      return technology.toJSON();
    },

    // Get current user
    async currentUser(_, ctx, { auth }) {
      await auth.check();

      const id = auth.user.id;
      const user = await User.find(auth.user.id);
      return user.toJSON();
    },

    // Get technologies avalilable in today
    async fetchTechnologiesAvailable(_, ctx, { auth }) {
      await auth.check();

      const id = auth.user.id;
      const dateToday = new Date();
      const user = await User.find(id);

      // technology of user in today
      const technologiesToday = await user
        .technologies()
        .pivotQuery()
        .where("date_checkIn", dateToday)
        .fetch();

      // technologies
      const technologies = await Technology.all();

      // Convert to JSON format
      const technologiesJson = technologies
        .toJSON()
        .map(({ id, technology }) => ({ id, technology }));

      // Convert to JSON format
      const technologiesTodayJson = technologiesToday
        .toJSON()
        .map(({ technology_id }) => technology_id);

      // Remove technologies already tracking
      const technologiesAvailable = technologiesJson.filter(
        ({ id }) => !technologiesTodayJson.includes(id)
      );

      return technologiesAvailable;
    },
  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password);
      return token;
    },

    // Create new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password });
    },

    // Add a new technology
    async createTechnology(_, { technology }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check();

        // Add new technology
        return await Technology.create({
          technology,
        });
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error(error);
      }
    },

    // Add new tracking
    async createTracking(_, { technologies }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check();

        // Add new tracking
        const data = technologies.map((tech) => {
          const { technology_id } = tech;
          return {
            technology_id,
            user_id: auth.user.id,
            date_checkIn: new Date(),
          };
        });

        const checkins = await CheckIn.createMany(data);
        return checkins;
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error(error);
      }
    },
  },

  User: {
    // Fetch all technologies tracked by a user
    async technologies(userInJson) {
      // Convert JSON to model instance
      const user = new User();
      user.newUp(userInJson);

      const dateToday = new Date();

      const technologies = await user
        .technologies()
        .wherePivot("date_checkIn", dateToday)
        .fetch();
      return technologies.toJSON();
    },
  },

  Technology: {
    // Fetch all users tracked by technologies
    async users(technologyInJson) {
      // Convert JSON to model instance
      const technology = new Technology();
      technology.newUp(technologyInJson);

      const dateToday = new Date();

      const users = await technology
        .users()
        .wherePivot("date_checkIn", dateToday)
        .fetch();
      return users.toJSON();
    },
  },
};

module.exports = resolvers;
