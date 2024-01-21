import { User } from "./database/models/userModel.js";

import mongoose from 'mongoose'

export async function meterUser(info){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);

    let doesItExist = await User.findOne({ password:info[1] }).exec();

    await doesItExist;

    if (doesItExist === null){

      await User.create({ name: info[0], password:info[1] });

      return 'created'

    }else{
    
      return 'not created'
    

    }
    
   



    
}

