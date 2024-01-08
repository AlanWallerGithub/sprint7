import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
 
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

let num = 0;



io.on('connection', socket =>{
    socket.on('send-message',(message, room)=>{
        if (room === ''){
            socket.broadcast.emit('receive-message',message)
        }else{
            socket.to(room).emit('receive-message',message)
        }
        
    })
    socket.on('join-room',(room, callback)=>{
        socket.join(room);
        callback(`Joined ${room}`)
    })
})



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + './../client/register.html'));
    });

    app.use(express.static(path.join(__dirname + './../client')));

server.listen(3000,()=>{
    console.log('server is running on port 3000')     
  });


