import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";


export const registerUser=async (req,res)=>{
       try{
          const{name,username,email,password,phoneNo}=req.body

          //validation
          if(!name||!username||!email||!password||!phoneNo){
            return res.status(400).json({message:"All fields are required"});
          }

          const user=User.findOne({username})
          if(user){
            return res.status(400).json({message:"User already exists"});
          }

          const hashedpassword=await bcrypt.hash(password,10);
          const newUser=new User{
            name,
            username,
            email,
            phoneNo,
            password:hashedpassword
          }
          await newUser.save();

       }catch(error){
            res.status(500).json({message:"Internal Server Error"})
            console.log("error registering the user",error)
       }
}