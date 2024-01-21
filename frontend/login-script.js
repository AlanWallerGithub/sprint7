

let loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', login);

let currentMessages = [];

let userName = '';


async function login(){

   

    const baseUrl = 'http://127.0.0.1:3000/login/'
    userName = document.getElementById('login-name').value;
    let password = document.getElementById('login-password').value;

   let arrayMensajes = await fetch(baseUrl, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            info:[userName, password]
        })
    })

    .then(res => res.json())
    .then(res => {
        return res; // already json parsed object
    });
   
    console.log('is this it2222?')
   
    currentMessages = arrayMensajes.arrayMensajes;

    llenarChat((arrayMensajes.arrayMensajes),'general')

    
}




 function llenarChat(arrayMensajes, roomName){


    let mensajesFinales = '';

    if (arrayMensajes.length > 0){
        
    let soloMensajesDelRoom = arrayMensajes.filter(function(element) {
        
        if (element[0] == roomName){
            return element[1]
        }});

        

    let soloMensajesSinAnuncio = soloMensajesDelRoom.map(function(element) {
        
        if (element[0] == roomName){
            return element[2]+': '+element[1]
        }});

        console.log(soloMensajesSinAnuncio)

       
        
        mensajesFinales = soloMensajesSinAnuncio.join('<br>')
        
    }

    document.getElementById('login-page').innerHTML = '';
    
        document.getElementById('chat-entero').innerHTML = `
        <p>Current room:</p><p id="current-room">general</p>
        <div id="message-container">${mensajesFinales}</div>

        <form id="form">
          <br>
            <label for="message-input">Message</label>
            <input type="text" id="message-input">
            <button type="submit" id="send-button">Send</button>
            <label for="room-input">Room</label>
            <input type="text" id="room-input">
            <button type="button" id="room-button">Join</button>
        </form>
        <p>Rooms you've joined:</p>
        <p id="room-list"></p>`
    
        contenidoChat();
    

   
}

function contenidoChat(){




const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io("http://127.0.0.1:3000/");

socket.on('connect',()=>{
    displayMessage(`Welcome ${userName} to the general chat!`, true)
});

socket.on('receive-message',(message, userName)=>{
    let newMessage = userName+': '+message
    displayMessage(newMessage, false, true);
})


form.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === ''){
        return
    } 
    displayMessage(message);
    socket.emit('send-message',message, room, userName);

    messageInput.value = '';

});

joinRoomButton.addEventListener('click',()=>{
    let room = roomInput.value;
    let currentRoom = document.getElementById('current-room').innerHTML;
    if (currentRoom == room){
        alert(`You're already in the ${currentRoom} room!`);
        return
    }else{
        socket.emit('join-room',room, (joinMessage)=>{
            displayMessage(joinMessage, true);
            document.getElementById('room-list').innerHTML += room+'<br>'
        });
    }
   

    // COSAS
    document.getElementById('current-room').innerHTML = room;
    let arrayMensajes = currentMessages;
    let roomName = room;
    let mensajesFinales = '';

    if (arrayMensajes.length > 0){
        
    let soloMensajesDelRoom = arrayMensajes.filter(function(element) {
        
        if (element[0] == roomName){
            return element[1]
        }});

    let soloMensajesSinAnuncio = soloMensajesDelRoom.map(function(element) {
        
        if (element[0] == roomName){
            return element[2]+': '+element[1]
        }});


       
        
        mensajesFinales = soloMensajesSinAnuncio.join('<br>')

        document.getElementById('message-container').innerHTML = mensajesFinales;

        
    }
    // COSAS 


});

function displayMessage(message, announcement, otherUser){
    const div = document.createElement('div');
    if (announcement === true){

        div.textContent = message;

    }else{

        if (otherUser === true){
            div.textContent = message;
        }else{
            div.textContent = userName+': '+message;
        }
        
        
        
    }

    document.getElementById('message-container').append(div); 
    
}

}