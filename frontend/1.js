
async function discoverSomeData(){
    const baseUrlDecrypt = 'http://localhost:3000/returnEncryptData/'

    let data = await fetch(baseUrlDecrypt, {
         method: 'GET'
     })
     const dataJson = await data.json();
    
    llenarChat(dataJson.decryptedData[0],dataJson.decryptedData[1],dataJson.decryptedData[2],dataJson.decryptedData[3])

    
     
}

discoverSomeData()


function llenarChat(arrayMensajes, roomName, userName, currentMessages){

    
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
        
    }
    
        document.getElementById('message-container').innerHTML = mensajesFinales
    
        contenidoChat(userName, currentMessages);
}

function contenidoChat(userName, currentMessages){




const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io("http://localhost:3000/");

socket.on('connect',()=>{
    displayMessage(`Welcome ${userName} to the general chat!`, true)
});

socket.on('receive-message',(message, userName)=>{
    let newMessage = userName+': '+message
    displayMessage(newMessage, true);
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

function displayMessage(message, announcement){
    const div = document.createElement('div');
    if (announcement === true){

        div.textContent = message;

    }else{

      div.textContent = userName+': '+message;  
        
    }

    document.getElementById('message-container').append(div); 
    
}

}
