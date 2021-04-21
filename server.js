const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const {tasks, users} = require('./constants/index');

const {connection} = require('./database/utils');

const resolvers = require('./resolvers');

const typeDefs = require('./typeDefs');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connection();



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