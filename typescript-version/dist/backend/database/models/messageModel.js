import mongoose from 'mongoose';
const messageModel = new mongoose.Schema({
    sender: { type: String, trim: true },
    content: { type: String, trim: true },
    chat: {
        type: String, trim: true
    }
}, {
    timestamps: true
});
export const Message = mongoose.model('Message', messageModel);
