import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema= new Schema ({
    user_name:{
        type:String,
        required:true,
        unique:true,
    },
    user_email:{
        type:String,
        require:true,
        unique:true
    },
    user_password:{
        type:String,
        require:true
        
    }
 
})

export default mongoose.model("userauth",userSchema)