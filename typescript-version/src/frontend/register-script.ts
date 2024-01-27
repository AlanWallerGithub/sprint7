
const baseUrl = 'http://localhost:3000/'

const regButton = document.getElementById('reg-button')

if (regButton){
    regButton.addEventListener('click', register)
}


async function register(){
  
    let name = (document.getElementById('register-name')as HTMLInputElement).value;
    let password = (document.getElementById('register-password') as HTMLInputElement).value;

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