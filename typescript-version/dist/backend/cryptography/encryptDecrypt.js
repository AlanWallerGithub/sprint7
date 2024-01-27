var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import crypto from 'crypto';
export function hash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (typeof process.env.SALT == 'string') {
                const salt = process.env.SALT;
                crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                    if (err)
                        reject(err);
                    resolve(salt + ":" + derivedKey.toString('hex'));
                });
            }
        });
    });
}
export function verify(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(":");
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err)
                    reject(err);
                resolve(key == derivedKey.toString('hex'));
            });
        });
    });
}
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
export function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
export function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
let array = { 1: 'my name', 2: 'my surname' };
let arrayReal = ['my name', 'my surname'];
let stringedArray = JSON.stringify(arrayReal);
console.log('stringified ' + stringedArray);
let data1 = encrypt(stringedArray);
console.log('first data ' + data1);
let data2 = decrypt(data1);
let data2String = data2.toString();
let parsedData2 = JSON.parse(data2String);
console.log('second thing ' + parsedData2[1]);
