

let loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', login);



async function login(){

   

    const baseUrl = 'http://127.0.0.1:3000/login/'
    let name = document.getElementById('login-name').value;
    let password = document.getElementById('login-password').value;

   let res = await fetch(baseUrl, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            info:[name, password]
        })
    })
   
    doesUserExistOrNot();

    
}

async function doesUserExistOrNot(){

    const baseUrl =  `http://127.0.0.1:3000/loggedOrNot/:mensajes`

   

    let arrayMensajes = await fetch(baseUrl, {
        method: 'GET',
    

    })

    .then(res => res.json())
    .then(res => {
        return res; // already json parsed object
    });

    console.log(arrayMensajes)


   

    llenarChat()
}




 function llenarChat(){
    // IMPLEMENT THIS 'LOGGED OR NOT' ROUTE FOR TO GET THE RESULT OF WHETHER, and this could be an array that gets stored in the backend, detailing whether we're logged or not, or whether the CURRENT user is?? hard
  


    document.getElementById('chat-entero').innerHTML = `<div id="message-container"></div>
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
    displayMessage(`User ${socket.id} joined the general chat`)
});

socket.on('receive-message',(message)=>{
    displayMessage(message);
})


form.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === ''){
        return
    } 
    displayMessage(message);
    socket.emit('send-message',message, room);

    messageInput.value = '';

});

joinRoomButton.addEventListener('click',()=>{
    const room = roomInput.value;
    socket.emit('join-room',room, (joinMessage)=>{
        displayMessage(joinMessage);
        document.getElementById('room-list').innerHTML += room+'<br>'
    });

});

function displayMessage(message){
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('message-container').append(div);
}

}