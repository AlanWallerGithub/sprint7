import { User } from "./database/models/userModel.js";
import { hash } from "./cryptography/encryptDecrypt.js";

import mongoose from 'mongoose';

export async function loggearUser(info){

    let uri = "mongodb://localhost:27017/pruebaChat";
    let encryptedPass = await hash(info[1]);
 
    let encryptedName = await hash(info[0]);


 
  await mongoose.connect(uri)

  let doesPassExist = await User.findOne({ password:encryptedPass }).exec();

  await doesPassExist;

  let doesNameExist = await User.findOne({ name:encryptedName }).exec();

  await doesNameExist;



  if (doesPassExist && doesNameExist){

    console.log('has logged in')

    return 'user exists'

  }else{

    console.log('no has logged in')
  
    return 'user does not exist'
  

  }
   

}

