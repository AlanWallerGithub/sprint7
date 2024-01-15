
const baseUrl = 'http://127.0.0.1:3000/'

const regButton = document.getElementById('reg-button')

regButton.addEventListener('click', register)

async function register(){
  
    let name = document.getElementById('register-name').value;
    let password = document.getElementById('register-password').value;

    const res = await fetch(baseUrl, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            info:[name, password]
        })
    })
}