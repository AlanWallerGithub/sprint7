var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Message } from './database/models/messageModel.js';
import mongoose from 'mongoose';
export function guardarMensaje(message, room, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        let uri = "mongodb://localhost:27017/pruebaChat";
        yield mongoose.connect(uri);
        yield Message.create({ sender: userName, content: message, chat: room });
        return 'created';
    });
}
export function obtenerMensajes() {
    return __awaiter(this, void 0, void 0, function* () {
        let uri = "mongodb://localhost:27017/pruebaChat";
        yield mongoose.connect(uri);
        let mensajes = yield Message.find({});
        let soloMensajes = mensajes.map((m) => [m.chat, m.content, m.sender]);
        return soloMensajes;
    });
}
