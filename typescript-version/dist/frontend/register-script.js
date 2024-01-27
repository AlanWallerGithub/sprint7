var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:3000/';
const regButton = document.getElementById('reg-button');
if (regButton) {
    regButton.addEventListener('click', register);
}
function register() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = document.getElementById('register-name').value;
        let password = document.getElementById('register-password').value;
        const res = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                info: [name, password]
            })
        });
    });
}
export {};
