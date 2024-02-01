
let loginButton = document.getElementById('login-button')

if (loginButton){
    loginButton.addEventListener('click', login);
}


let currentMessages = [];

let userName = '';

async function login(){

    const baseUrl = 'http://localhost:3000/login/';

    userName = (document.getElementById('login-name') as HTMLInputElement).value;
    let password = (document.getElementById('login-password') as HTMLInputElement).value;

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
    
    const baseUrlEncrypt = 'http://localhost:3000/encryptData/'

    

   await fetch(baseUrlEncrypt, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            info:[arrayMensajes.arrayMensajes, 'general', userName, currentMessages]
        })
    });

    window.location.href = "/auth/google";
    
}
