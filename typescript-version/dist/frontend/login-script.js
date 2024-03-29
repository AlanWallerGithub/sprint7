var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let loginButton = document.getElementById('login-button');
if (loginButton) {
    loginButton.addEventListener('click', login);
}
let currentMessages = [];
let userName = '';
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = 'http://localhost:3000/login/';
        userName = document.getElementById('login-name').value;
        let password = document.getElementById('login-password').value;
        let arrayMensajes = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                info: [userName, password]
            })
        })
            .then(res => res.json())
            .then(res => {
            return res;
        });
        currentMessages = arrayMensajes.arrayMensajes;
        const baseUrlEncrypt = 'http://localhost:3000/encryptData/';
        yield fetch(baseUrlEncrypt, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                info: [arrayMensajes.arrayMensajes, 'general', userName, currentMessages]
            })
        });
        window.location.href = "/auth/google";
    });
}
export {};
