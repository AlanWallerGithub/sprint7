import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import express from 'express';
import session from 'express-session';
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

import './auth.js';


 
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

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

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

        app.get('/oauth',(req, res)=>{
          console.log('were in oauth')
          res.send()
        })

        app.get('/protected',isLoggedIn, async (req, res)=>{
          console.log('were in protected')
          res.send('hola desde protected')
        })


        app.get('/logout', (req, res)=>{
          req.session.destroy();
          res.redirect("http://localhost:3000/")
        })

        app.get('/auth/google',
           passport.authenticate('google',{scope: ['email', 'profile']})
        )

        app.get('/google/callback', 
        passport.authenticate('google',{

          successRedirect: '/protected',
          failureRedirect: '/auth/failure'
        }))

        app.get('auth/failure', (req, res)=>{

          res.send('Something went wrong')
        })

        function isLoggedIn(req, res, next){
          req.user ? next() : res.sendStatus(401)
        }
        

        app.post('/login', async function(req, res){
          console.log('were in login')
            const {info} = req.body;
            let result = await loggearUser(info)
            if (result === 'user exists'){

  
              
              let mensajes = await obtenerMensajes()


    
              
              res.json({ arrayMensajes: mensajes});
             
            }
            });

        

   // *******

server.listen(3000,()=>{
    console.log('server is running on port 3000')     
  });


