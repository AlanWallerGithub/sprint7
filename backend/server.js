import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
import { meterUser } from './backendRegister.js';
import { loggearUser } from './backendLogin.js';
import { guardarMensaje } from './databaseScripts.js';
import { obtenerMensajes } from './databaseScripts.js';
 
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

let num = 0;



io.on('connection', socket =>{
    socket.on('send-message',(message, room, userName)=>{
        if (room === ''){
            socket.broadcast.emit('receive-message',message, userName)
            guardarMensaje(message, 'general', userName);
        }else{
            socket.to(room).emit('receive-message',message, userName)
            guardarMensaje(message, room, userName);
        }
        
    })
    socket.on('join-room',(room, callback)=>{
        socket.join(room);
        callback(`Joined ${room}`)
    })
})



app.use(express.static(path.join(__dirname + './../frontend/')));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    },
  })
)
app.use(cors());
app.use(express.json())

app.get('/', function(req, res){
  res.send()
  });

  // ROUTES

    app.post('/', async function(req, res){
        const {info} = req.body;
        await meterUser(info)
       

        });

        app.get(`http://localhost:3000/favicon.ico`, (req, res)=>{   
         
          
          res.redirect("http://localhost:3000/")
          
      
        })


        

        app.post('/login', async function(req, res, next){
            const {info} = req.body;
            let result = await loggearUser(info)
            if (result === 'user exists'){

  
              
              let mensajes = await obtenerMensajes()


              // This should contain the NAME of the user who sent each message, please
              
              res.json({ arrayMensajes: mensajes});
             
            }
            });

        

   // *******

server.listen(3000,()=>{
    console.log('server is running on port 3000')     
  });


