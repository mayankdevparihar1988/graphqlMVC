const { v4 } = require("uuid");
const User = require("../database/models/user");
const Task = require("../database/models/task");
const { isAuthenticated, isTaskOwner } = require("../resolvers/middleware");
const { combineResolvers } = require("graphql-resolvers");
const user = require("../database/models/user");
const task = require("../typeDefs/task");
const { encodeBase64 } = require("bcryptjs");
const {base64ToString,stringToBase64} = require('../helper');
//TODO Fix the limit issue currently not working
module.exports = {
  Query: {
    tasks: combineResolvers(
      isAuthenticated,
      async (_, {cursor, limit=10}, { loggedInUserId }) => {
        try {
            console.log('The loggedInUserId comming from context is ', loggedInUserId);
            const query = { user: loggedInUserId };
            if(cursor){
              // Cursor works best with indexed property as it is faster to retrieved indexed values
              query['_id']= {
                '$lt':base64ToString(cursor)
              }
            }
          // To check if next page available we fetch one more record the provide limit
          let tasks = await Task.find(query).sort({_id:-1}).limit(limit +1);

          const hasNextPage = tasks.length> limit;

          if(hasNextPage){
            tasks = tasks.slice(0,-1);
          }

          console.log('The last task id is ', );
          const lastTaskId = tasks[tasks.length- 1].id;

          return {
            taskFeed: tasks,
            pageInfo: {
              nextPageCursor: hasNextPage? stringToBase64(lastTaskId): null,
              hasNextPage
            }
          };
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

    updateTask: combineResolvers(isAuthenticated,isTaskOwner,async (_,{id,input})=>{
        try {
            
            const task = await Task.findByIdAndUpdate(id,{...input},{new:true});
            return task;

        } catch (error) {
            console.log('Error in updating Task to database  ', error);
            throw error;
        }
      
    }),
    
    deleteTask: combineResolvers(isAuthenticated,isTaskOwner, async (_,{id}, {loggedInUserId})=>{

        try {

            const task = await Task.findByIdAndDelete(id);
            await user.updateOne({_id: loggedInUserId},{$pull:{tasks: task.id}});

            return task;
            
        } catch (error) {
            console.log(error);
            throw error;
        }


    })
  },
  // Individual field Resolver for task (Task contains user)
  Task: {
    user: async (parent) => {

        console.log('The retrived User Id for task', parent.user)
      return await User.findById(parent.user);
    },
  },
};
