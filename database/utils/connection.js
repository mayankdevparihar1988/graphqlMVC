const mongoose = require('mongoose');

module.exports.connection = async()=> {

 try{

    await mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Database is connected successfuly!!');
 }catch(err){

    console.error(err);
    throw err;
 }

   
}