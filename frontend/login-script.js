
let loginButton = document.getElementById('login-button')

if (loginButton){
    loginButton.addEventListener('click', login);
}


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
        return res;
    });
   
    currentMessages = arrayMensajes.arrayMensajes;

    //messagesData(arrayMensajes.arrayMensajes, 'general', userName, currentMessages)

    window.location.href = "/auth/google";
    
}