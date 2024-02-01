var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "./database/models/userModel.js";
import { hash } from "./cryptography/encryptDecrypt.js";
import mongoose from 'mongoose';
export function meterUser(info) {
    return __awaiter(this, void 0, void 0, function* () {
        let uri = "mongodb://localhost:27017/pruebaChat";
        let encryptedPass = yield hash(info[1]);
        let encryptedName = yield hash(info[0]);
        yield mongoose.connect(uri);
        let doesPassExist = yield User.findOne({ password: encryptedPass }).exec();
        yield doesPassExist;
        let doesNameExist = yield User.findOne({ name: encryptedName }).exec();
        yield doesNameExist;
        if (doesPassExist === null && doesNameExist === null) {
            console.log('user is not in database');
            yield User.create({ name: encryptedName, password: encryptedPass });
            return 'created';
        }
        else {
            console.log('user is in database');
            return 'not created';
        }
    });
}
