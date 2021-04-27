

const {gql} = require('apollo-server-express');

const taskSchema = require('./task');
const userSchema = require('./user');


const typeDefs = gql`

    scalar Date

    type Query{

        dummy:String

    }

    type Mutation{
        dummy:String
        
    }

    type Subsctiption{
        dummy:String
    }


`;


module.exports=[typeDefs,taskSchema,userSchema];