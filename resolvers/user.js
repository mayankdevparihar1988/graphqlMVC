const {users, tasks} = require('../constants');
const {v4} = require('uuid');


module.exports= {
    Query: {
        users: ()=> users,
        user:(parent,args) => users.find((user)=> user.id===args.id)
    },

    Mutation:{
        createUser: (parent,{input})=>{

            let idV4 = v4();

            console.log(`The generatedId is ${idV4}`);
            const user = {...input, id:idV4};

            users.push(user);

            console.log(`The task array is ${users}`)

            return user;



        }

    },

    // Users contain tasks field resolver for User 
    User: {
        tasks: (parent)=> {return tasks.filter((task)=> task.userId === parent.id)}
    }
};


