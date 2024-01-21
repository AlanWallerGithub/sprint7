import { Message } from './database/models/messageModel.js';

import mongoose from 'mongoose'

export async function guardarMensaje(message, room, userName){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      await Message.create({ sender: userName, content:message, chat:room});

      return 'created'

   
    
}

export async function obtenerMensajes(){



    let uri = "mongodb://localhost:27017/pruebaChat";

    

    await mongoose.connect(uri);



      let mensajes = await Message.find({ });

      

      let soloMensajes = mensajes.map((m) => [m.chat,m.content, m.sender]);
    

      return soloMensajes;

   
    
}



