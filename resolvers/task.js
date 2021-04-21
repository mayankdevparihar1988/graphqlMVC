
const {users, tasks} = require('../constants');
const {v4} = require('uuid');

module.exports  = {
    Query: {
        
        tasks: ()=> tasks,
        task: (parent,args)=> tasks.find((task)=> task.id === args.id)
      
    },

    Mutation:{
        createTask: (parent,{input})=>{

            let idV4 = v4();

            console.log(`The generatedId is ${idV4}`);
            const task = {...input, id:idV4};

            tasks.push(task);

            console.log(`The task array is ${tasks}`)

            return task;



        }

    },
// Individual field Resolver for task (Task contains user)
    Task:{

        user: (parent)=> { return users.find(user => user.id === parent.userId)}

    }
};


