

const {gql} = require('apollo-server-express');

const taskSchema = require('./task');
const userSchema = require('./user');


const typeDefs = gql`

    type Query{

        dummy:String

    }

    type Mutation{
        dummy:String
        
    }


`;


module.exports=[typeDefs,taskSchema,userSchema];