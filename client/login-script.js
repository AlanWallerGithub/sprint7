
function login(){
    let name = document.getElementById('login-name').value;
    let password = document.getElementById('login-password').value;

    let loopCheck = false;

    for (let i=0;i<testDatabase.length;i++){

        if (testDatabase[i].name === name && testDatabase[i].password === password){
            loopCheck = true;
        }
    }

    if (loopCheck === false){
        console.log('El usuario no existe')
        console.log(testDatabase)
    }else{
        console.log('El usuario existe')
        console.log(testDatabase)
    }
}