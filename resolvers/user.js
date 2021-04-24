
const {v4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {combineResolvers} = require('graphql-resolvers');
const User = require('../database/models/user');
const {users, tasks} = require('../constants');
const user = require('../database/models/user');
const  {isAuthenticated} = require('./middleware');



module.exports= {
    Query: {
        users: ()=> users,
        user:combineResolvers(isAuthenticated,(parent,args, context) =>{
            console.log('The value retrieved from context is ', context.email);
            return users.find((user)=> user.id===args.id)
        })
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

        },

        login: async (_,{input})=>{

            // Steps 
            // 1) Check if user's email exists inside the database
            try{
                const retrievedUser = await User.findOne({email: input.email});
                if(!retrievedUser){
                    console.log("Could not find the user with email ", input.email);
                    throw new Error("Could not find the User with given email");
                }

                     // 2) get user then check the password if its correct 
            
                const isPasswordValid = await bcrypt.compare(input.password, retrievedUser.password);
                if(!isPasswordValid){
                    throw new Error('Provided password didnt matched');
                }

                const secret = process.env.JWT_SEC_KEY || 'mysecretKey';

                const token = jwt.sign({email:retrievedUser.email},secret,{expiresIn:'10h'})

                return {token};
            


            }catch(error){

                console.log("Error in retrieving User");
                throw error;
            }
          
       
            
            
        }

    },

    // Users contain tasks field resolver for User 
    User: {
        tasks: (parent)=> {return tasks.filter((task)=> task.userId === parent.id)}
    }
};


