const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const {tasks, users} = require('./constants/index');
const {v4} = require('uuid');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const typeDefs = gql`

    type Query{

        greetings: String
        tasks: [Task!]
        task(id:ID!): Task
        users: [User!]
        user(id:ID!): User
        
    }

    input createTaskInput {
        name: String!
        completed: Boolean!
        userId: ID!
        
    }

    type Mutation {
        createTask(input:createTaskInput!):Task
        
    }

    type User{

       id: ID!
       name:String!
       email:String!
       tasks: [Task!] 
    }

    type Task{
        id:ID!
        name: String!
        completed: Boolean!
        user: User!
    }

`;

const resolvers = {
    Query: {
        greetings: ()=>"Hello World!",
        tasks: ()=> tasks,
        task: (parent,args)=> tasks.find((task)=> task.id === args.id),
        users: ()=> users,
        user:(parent,args) => users.find((user)=> user.id===args.id)
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
// Individual field Resolver
    Task:{

        user: (parent)=> { return users.find(user => user.id === parent.userId)}

    },
    User: {
        tasks: (parent)=> {return tasks.filter((task)=> task.userId === parent.id)}
    }
};


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});


apolloServer.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 4007;

app.use('/',(req,res,next)=>{
    res.send({message:'Hello'});
})

app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`);
    console.log( 'The graphql path is /graphql');
})