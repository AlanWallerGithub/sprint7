import { User } from "./database/models/userModel.js";
import { hash } from "./cryptography/encryptDecrypt.js";

import mongoose from 'mongoose'

export async function meterUser(info: string[]){



    let uri = "mongodb://localhost:27017/pruebaChat";


    let encryptedPass = await hash(info[1]);
 
    let encryptedName = await hash(info[0]);

    console.log('pass1: '+encryptedPass)
 

    await mongoose.connect(uri);

    let doesPassExist = await User.findOne({ password:encryptedPass }).exec();

    await doesPassExist;

    let doesNameExist = await User.findOne({ name:encryptedName }).exec();

    await doesNameExist;

    if (doesPassExist === null && doesNameExist === null){

      console.log('user is not in database')

      await User.create({ name: encryptedName, password:encryptedPass });

      return 'created'

    }else{

      console.log('user is in database')
    
      return 'not created'
    

    }
    
   



    
}

