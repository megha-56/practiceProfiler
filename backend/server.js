import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';


const app=express();
app.use(cors());
dotenv.config();

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hey , here Im practicing backend')
});

app.listen(PORT,()=>{
    console.log(`console is running at port ${PORT}`)
})