const express = require('express');
const path = require('path')
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {origin: "*"}
});

let num = 0;

io.on('connection', socket =>{
    num = num+1;
    console.log(num)  
})

app.use( express.static(path.join(__dirname + './../client')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + './../client/index.html'));
    });

server.listen(3000,()=>{
    console.log('server is running on port 3000')     
  });