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
import { encrypt, hash } from './cryptography/encryptDecrypt.js';
import { decrypt } from './cryptography/encryptDecrypt.js';

import './auth.js';
 
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });



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

// El chat esta aqui, escondido hasta que tengas login
app.get('/protected.html', function(req, res) {
  return res.status(401).send('Not accessible');
});

app.use(express.static(path.join(__dirname + './../frontend/')));



app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'","ws:"],
      connectSrc:["'self'"],
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
        let registerResult = await meterUser(info)

        if (registerResult === 'created'){
          res.send('created')
        }else{
          res.send('not created')
        }
       
        });

        app.get(`http://localhost:3000/favicon.ico`, (req, res)=>{   
         
          
          res.redirect("http://localhost:3000/")
          
      
        })

        


        app.get('/protected', isLoggedIn, async (req, res)=>{
          res.sendFile(path.join(__dirname + './../frontend/protected.html'));
        })

  

        app.get('/logout', (req, res)=>{
          req.session.destroy(()=>{});
          
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

        function isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction){
          req.user ? next() : res.sendStatus(401)
        }

    app.get('/cookie',(req, res)=>{
      res.setHeader('set-cookie','foo=bar');
      let headerzzz = res.getHeaders()
      res.send(headerzzz['set-cookie']);
    })
        

        app.post('/login', async function(req, res){
          
            const {info} = req.body;
            
            let result = await loggearUser(info)
            if (result === 'user exists'){

              let mensajes = await obtenerMensajes()
              
              res.json({ arrayMensajes: mensajes});
              
             
            }else{
              res.send('not logged in')
            }
            });

            // Here we're saving the messages to send back to the client
            // ****************
            let messagesFromRoom: { iv: string; encryptedData: string; };

            // *****************

            app.post('/encryptData', async function(req, res){
                const {info} = req.body;
              
               
              let stringInfo = JSON.stringify(info);
              
                let hashedData = encrypt(stringInfo);
             
              messagesFromRoom = hashedData;
                  res.end()
                 
                
                });

                app.get('/returnEncryptData', async function(req, res){

                  
                    let newData = decrypt(messagesFromRoom);

                    let newDataToString = newData.toString();

                    let parsedData = JSON.parse(newDataToString)

                    
                
                    res.json({decryptedData:parsedData})
                   
                  
                  });

                  app.get('/obtenerMensajes', async function(req, res){

                  
                    let messages = await obtenerMensajes();

                    res.json({ arrayMensajes: messages});
                   
                  
                  });



   // *******

server.listen(3000,()=>{
    console.log('server is running on port 3000')     
  });


