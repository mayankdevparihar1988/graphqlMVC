

const {gql} = require('apollo-server-express');

module.exports = gql`

   extend type Query{

        users: [User!]
        user(id:ID!): User
        
    }

   

    input createUserInput {
        name: String!
        email: String!
        tasks: [ID!]
        
    }

    extend type Mutation {
         createUser(input: createUserInput!): User
        
    }

    type User{
       id: ID!
       name:String!
       email:String!
       tasks: [Task!] 
    }

   


`;




