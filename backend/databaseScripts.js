import { Message } from './database/models/messageModel.js';
import { Chat } from './database/models/chatModel.js';

import mongoose from 'mongoose'

export async function guardarMensaje(message){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      await Message.create({ content:message });

      return 'created'

   
    
}

export async function obtenerMensajes(){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      let mensajes = await Message.find({ });

      

      let soloMensajes = mensajes.map((m) => m.content);

      return soloMensajes;

   
    
}



