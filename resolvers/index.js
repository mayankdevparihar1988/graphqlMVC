const userResolver = require('./user');
const taskResolver = require('./task');
const {GraphQLDateTime} = require('graphql-iso-date');

const customerDateSchalarResolver = {
    Date: GraphQLDateTime
}

module.exports= [customerDateSchalarResolver,userResolver,taskResolver];