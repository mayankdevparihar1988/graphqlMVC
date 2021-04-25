const {v4} = require('uuid');
const User = require('../database/models/user');
const Task = require('../database/models/task');



module.exports  = {
    Query: {
        
        tasks: ()=> tasks,
        task: (parent,args)=> tasks.find((task)=> task.id === args.id)
      
    },

    Mutation:{
        createTask: async (parent,{input}, {email}) =>{

            try {
           
                console.log('User email id ', email);
                const retrievedUser = await User.findOne({email});
                console.log("retrievedUser -- ", retrievedUser);
                if(!retrievedUser){
                    console.log("User not found! Please Login!!");
                    throw new Error("Please login or user not found!");
                   }
    
                   const createdTask = new Task({...input, user:retrievedUser.id});
    
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
        
        },
// Individual field Resolver for task (Task contains user)
    Task:{

        user: async (parent)=> { return await user.findOne(parent.user.id); }
    }
};


