const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

module.exports.verifyUser = async (req)=>{


    try {

        req.email = null;
        req.loggedInUserId= null;
        
       // console.log(`The request obj is ${req.headers}`, req.headers);

        const bearerToken = req.headers.authorization;
    
        if(bearerToken){
    
            const token = bearerToken.split(' ')[1];
            console.log(`The token is `, token);
            const payload= jwt.verify(token, process.env.JWT_SEC_KEY);
            req.email = payload.email;
            const retrievedUser = await User.findOne({email: payload.email});
            req.loggedInUserId = retrievedUser.id;

    
    
        }

       /* if(!req.email){
            throw new Error('Please pass a valid token (Token is missing or invalid)');
        }*/
    
    } catch (error) {

        console.log('Error ', error);

        throw error;
        
    }

   

}