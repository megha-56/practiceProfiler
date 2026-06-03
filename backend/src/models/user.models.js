// import mongoose from "mongoose";

// const userSchema=new mongoose.Schema({
//     name: {
//         type:String,
//         required:true
//     },
//     username: {
//         type:String,
//         required:true,
//         unique:true
//     },
//     email: {
//         type:String,
//         required:true,
//         unique:true
//     }, 
//     phoneNo: {
//         type:String,
//         required:true,
//         unique:true
//     }, 
//     password:{
//         type:String,
//         required:true
//     } ,
//     pfp:{
//         type:String
//     }, 
//     gender:{
//         type:String
//     },
//     dob:{
//         type:Date
//     },
//     bio:{
//         type:String
//     },
//     skills:{
//         type: [String]
//     }

// },{timestamps:true});

// export const User=mongoose.model("User",userSchema);