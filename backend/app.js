const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const app=express();

const cors=require('cors')
const connectToDB=require('./db/db')
connectToDB();
app.use(cors());

app.get('/',(req,res)=>{
  res.send('Hello world');

})

module.exports=app;