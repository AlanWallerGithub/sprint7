import mongoose from 'mongoose';

const chatModel = mongoose.Schema(

    {

        chatName: {type: String, trim:true},
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
)

export const Chat = mongoose.model('Chat',chatModel);

