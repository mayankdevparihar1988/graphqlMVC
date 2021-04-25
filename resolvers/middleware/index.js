const {skip} = require('graphql-resolvers');
const Task = require('../../database/models/task');
module.exports.isAuthenticated = function isAuthenticated(_,__,{email}){

    if(!email){
        throw new Error('Access Denied! Please login to continue!!');
    }

    return skip;


}

module.exports.isTaskOwner = async (_,{id},{loggedInUserId})=> {

    try {
        const retrievedTask = await Task.findById(id);
        if(!retrievedTask){
            throw new Error("The task for given Id not found !");

          }
        
        if(retrievedTask.user.toString() !== loggedInUserId){
            throw new Error("Not authorized owner of the task!");
        }

        return skip;


    } catch (error) {

        console.log(error);
        throw error;
        
    }
    

}