const { v4 } = require("uuid");
const User = require("../database/models/user");
const Task = require("../database/models/task");
const { isAuthenticated, isTaskOwner } = require("../resolvers/middleware");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    tasks: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, __, { loggedInUserId }) => {
        try {
          const tasks = await Task.find({ user: loggedInUserId });
          return tasks;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    task: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (parent, args) => {
        try {
          const task = await Task.findById(args.id);
          return task;
        } catch (error) {
          console.log(error);
        }
      }
    ),
  },

  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { email }) => {
        try {
          console.log("User email id ", email);
          const retrievedUser = await User.findOne({ email });
          console.log("retrievedUser -- ", retrievedUser);
          if (!retrievedUser) {
            console.log("User not found! Please Login!!");
            throw new Error("Please login or user not found!");
          }

          const createdTask = new Task({ ...input, user: retrievedUser.id });

          const result = await createdTask.save();

          // pushing the task to the user
          retrievedUser.tasks.push(result.id);

          await retrievedUser.save();

          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
  // Individual field Resolver for task (Task contains user)
  Task: {
    user: async (parent) => {

        console.log('The retrived User Id for task', parent.user)
      return await User.findById(parent.user );
    },
  },
};
