import mongoose from 'mongoose';
const chatModel = new mongoose.Schema({
    // make chat name unique, dont allow more
    chatName: { type: String, trim: true, unique: true },
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
}, {
    timestamps: true
});
export const Chat = mongoose.model('Chat', chatModel);
