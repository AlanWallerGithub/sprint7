import mongoose from 'mongoose';


const userModel = new mongoose.Schema(
    {
        name:{type:String, required:true},
        password:{type:String, required:true},
    },
    {timestamps:true}
)

export const User = mongoose.model('User', userModel);