

async function discoverSomeData(){
    const baseUrlDecrypt = 'http://localhost:3000/returnEncryptData/'

    let data = await fetch(baseUrlDecrypt, {
         method: 'GET'
     })
     const dataJson = await data.json();
    
    llenarChat(dataJson.decryptedData[0],dataJson.decryptedData[1],dataJson.decryptedData[2],dataJson.decryptedData[3])

    
     
}

discoverSomeData()


function llenarChat(arrayMensajes: string[], roomName: string, userName: string, currentMessages: string[]){

    
    let mensajesFinales: string = '';

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
        
        (document.getElementById('message-container') as HTMLElement).innerHTML = mensajesFinales
    
        contenidoChat(userName, currentMessages);
}

function contenidoChat(userName: string, currentMessages: string[]){




const joinRoomButton = document.getElementById('room-button');
const messageInput = (document.getElementById('message-input') as HTMLInputElement);
const roomInput = (document.getElementById('room-input') as HTMLInputElement);
const form = document.getElementById('form');


const socket = io("http://localhost:3000/");




socket.on('connect',()=>{
    displayMessage(`Welcome ${userName} to the general chat!`, true)
});

socket.on('receive-message',(message: string, userName: string)=>{
    let newMessage = userName+': '+message
    displayMessage(newMessage, true);
})

if (form){
    form.addEventListener('submit', e=>{
        e.preventDefault();
        if (messageInput){
            const message = messageInput.value;
        
        if (roomInput){
            const room = roomInput.value;
        
      
    
        if (message === ''){
            return
        } 
        displayMessage(message, false);
        socket.emit('send-message',message, room, userName);
    
        messageInput.value = '';
    }
    }
    });
}

if (joinRoomButton){
    

joinRoomButton.addEventListener('click',()=>{
    let room = roomInput.value;
    let currentRoom = (document.getElementById('current-room') as HTMLElement).innerHTML;
    if (currentRoom == room){
        alert(`You're already in the ${currentRoom} room!`);
        return
    }else{
        socket.emit('join-room',room, (joinMessage: string)=>{
            displayMessage(joinMessage, true);
            (document.getElementById('room-list') as HTMLElement).innerHTML += room+'<br>'
        });
    }
   

    // COSAS
    (document.getElementById('current-room') as HTMLElement).innerHTML = room;
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


       
        
        mensajesFinales = soloMensajesSinAnuncio.join('<br>');

        (document.getElementById('message-container') as HTMLElement).innerHTML = mensajesFinales;

        
    }
    // COSAS 


});

}

function displayMessage(message: string, announcement: boolean){
    const div = document.createElement('div');
    if (announcement === true){

        div.textContent = message;

    }else{

      div.textContent = userName+': '+message;  
        
    }

    (document.getElementById('message-container') as HTMLElement).append(div); 
    
}

}
