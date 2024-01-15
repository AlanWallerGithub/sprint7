import { User } from "./database/models/userModel.js";

import mongoose from 'mongoose';

export async function loggearUser(info){

    let uri = "mongodb://localhost:27017/pruebaChat";

 
  await mongoose.connect(uri)

  let doesItExist = await User.findOne({ name: info[0], password:info[1] }).exec();

  await doesItExist;

  if (doesItExist === null){

    return 'user does not exist'

  }else{
  
    return 'user exists'
  

  }
   

}

