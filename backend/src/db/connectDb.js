import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
         console.log("error connecting to database",err);
         process.exit(1);
    }
}

export default connectDb;