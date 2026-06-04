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
       res.status(201).json({message:"Registeres new user"})
       }catch(error){
            res.status(500).json({message:"Internal Server Error"})
            console.log("error registering the user",error)
       }
}

export const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        
        //validation
        if(!username||!password){
            return res.status(400).json({message:"username and password are required"})
        }

        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        
        const isPasswordcorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordcorrect){
            return res.status(400).json({message:"Incorrect Password"})
        }
        
        res.status(200).json({message:"logged in successfully"})
    }catch(error){
        console.log("error logging in",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}