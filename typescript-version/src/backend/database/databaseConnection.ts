import mongoose from 'mongoose';


var uri = "mongodb://localhost:27017/";

const connectDB = async ()=>{
  try{
    const conn = await mongoose.connect(uri )
  }catch(err){

  }
  
}

