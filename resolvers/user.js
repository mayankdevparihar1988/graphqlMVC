const {users, tasks} = require('../constants');
const {v4} = require('uuid');
const User = require('../database/models/user');
const bcrypt = require('bcryptjs');


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



        },

        signup: async (parent,{input})=>{

            let result;

            try{

              const retrievedUser =  await User.findOne({email: input.email});

              if(retrievedUser){

                throw new Error('Email already in use!');

              }

              // if not duplicate 

              const hashedPassword = await bcrypt.hash(input.password,12);

              const newUser = new User({...input,password:hashedPassword});

               result = await newUser.save();
              


            }catch(err){

                console.log('Error occured in findOne ', err);
                throw err;
            }
           
          
            return result;

        }

    },

    // Users contain tasks field resolver for User 
    User: {
        tasks: (parent)=> {return tasks.filter((task)=> task.userId === parent.id)},
        createdAt: ()=> "2021-04-22T09:00:30.512+00:00"
    }
};


