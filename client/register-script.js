
function register(){
    let name = document.getElementById('register-name').value;
    let password = document.getElementById('register-password').value;

    testDatabase.push({name:name, password:password});
    console.log(testDatabase);
}