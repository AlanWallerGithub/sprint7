import { Message } from './database/models/messageModel.js';
import { Chat } from './database/models/chatModel.js';

import mongoose from 'mongoose'

export async function guardarMensaje(message){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      await Message.create({ content:message });

      return 'created'

   
    
}

export async function guardarMensaje(info){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      await Chat.create({ chatName:info[0], users:info[1] });

      return 'created'

   
    
}



