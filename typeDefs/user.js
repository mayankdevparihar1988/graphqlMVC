

const {gql} = require('apollo-server-express');

module.exports = gql`

   extend type Query{

        users: [User!]
    
        user: User
        
    }

   

    input createUserInput {
        name: String!
        email: String!
        tasks: [ID!]
        
    }

    input signupInput {
        name: String!
        email: String!
        password: String!
        
    }

    input loginInput {

        email: String!
        password: String!

    }
   

    extend type Mutation {
         createUser(input: createUserInput!): User
         signup(input: signupInput!): User
         login(input: loginInput!):Token
    }

    type Token {
        token:String!
    }

    type User{
       id: ID!
       name:String!
       email:String!
       tasks: [Task!] 
       createdAt:Date!
       updatedAt:Date! 
    }

   


`;




