const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 4007;

app.use('/',(req,res,next)=>{
    res.send({message:'Hello'});
})

app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`);
})