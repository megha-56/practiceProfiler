import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from "./src/db/connectDb.js";


const app=express();
app.use(cors());
dotenv.config();

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hey , here Im practicing backend')
});

app.listen(PORT,()=>{
    connectDb();
    console.log(`console is running at port ${PORT}`)
})