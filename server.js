const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const typeDefs = gql`

    type Query{

        greetings: String
        
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

const resolvers = {};


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