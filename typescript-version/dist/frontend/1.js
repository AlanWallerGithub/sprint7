var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentMessageArray = [];
function discoverSomeData() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrlDecrypt = 'http://localhost:3000/returnEncryptData/';
        let data = yield fetch(baseUrlDecrypt, {
            method: 'GET'
        });
        const dataJson = yield data.json();
        currentMessageArray = dataJson.decryptedData[0];
        llenarChat(dataJson.decryptedData[0], dataJson.decryptedData[1], dataJson.decryptedData[2], dataJson.decryptedData[3]);
    });
}
discoverSomeData();
function llenarChat(arrayMensajes, roomName, userName, currentMessages) {
    let mensajesFinales = '';
    if (arrayMensajes.length > 0) {
        let soloMensajesDelRoom = arrayMensajes.filter(function (element) {
            if (element[0] == roomName) {
                return element[1];
            }
        });
        let soloMensajesSinAnuncio = soloMensajesDelRoom.map(function (element) {
            if (element[0] == roomName) {
                return element[2] + ': ' + element[1];
            }
        });
        mensajesFinales = soloMensajesSinAnuncio.join('<br>');
    }
    document.getElementById('message-container').innerHTML = mensajesFinales;
    contenidoChat(userName, currentMessages);
}
function contenidoChat(userName, currentMessages) {
    const joinRoomButton = document.getElementById('room-button');
    const messageInput = document.getElementById('message-input');
    const roomInput = document.getElementById('room-input');
    const form = document.getElementById('form');
    const socket = io("http://localhost:3000/");
    socket.on('connect', () => {
        displayMessage(`Welcome ${userName} to the general chat!`, true);
    });
    socket.on('receive-message', (message, userName) => {
        let newMessage = userName + ': ' + message;
        displayMessage(newMessage, true);
    });
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (messageInput) {
                const message = messageInput.value;
                if (roomInput) {
                    const room = roomInput.value;
                    if (message === '') {
                        return;
                    }
                    // I could push the new message to the current messages array
                    currentMessageArray.push(message);
                    console.log('aqui hay consola ' + currentMessageArray);
                    console.log('aqui hay consola2 ' + message);
                    displayMessage(message, false);
                    socket.emit('send-message', message, room, userName);
                    messageInput.value = '';
                }
            }
        });
    }
    if (joinRoomButton) {
        joinRoomButton.addEventListener('click', () => {
            let room = roomInput.value;
            let currentRoom = document.getElementById('current-room').innerHTML;
            if (currentRoom == room) {
                alert(`You're already in the ${currentRoom} room!`);
                return;
            }
            else {
                socket.emit('join-room', room, (joinMessage) => {
                    displayMessage(joinMessage, true);
                    document.getElementById('room-list').innerHTML += room + '<br>';
                });
            }
            // COSAS
            document.getElementById('current-room').innerHTML = room;
            let arrayMensajes = currentMessageArray;
            let roomName = room;
            let mensajesFinales = '';
            if (arrayMensajes.length > 0) {
                let soloMensajesDelRoom = arrayMensajes.filter(function (element) {
                    if (element[0] == roomName) {
                        return element[1];
                    }
                });
                let soloMensajesSinAnuncio = soloMensajesDelRoom.map(function (element) {
                    if (element[0] == roomName) {
                        return element[2] + ': ' + element[1];
                    }
                });
                mensajesFinales = soloMensajesSinAnuncio.join('<br>');
                document.getElementById('message-container').innerHTML = mensajesFinales;
            }
            // COSAS 
        });
    }
    function displayMessage(message, announcement) {
        const div = document.createElement('div');
        if (announcement === true) {
            div.textContent = message;
        }
        else {
            div.textContent = userName + ': ' + message;
        }
        document.getElementById('message-container').append(div);
    }
}
export {};
