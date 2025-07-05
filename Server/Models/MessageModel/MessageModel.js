import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
    text: {
        type: String, 
        default: ''
    },

    fileDetails: {
        Url: {
            type: String, 
            default: ''
        },
        Format: {
            type: String, 
            default: ''
        }
    },
    seen: {
        type: Boolean, 
        default: false 
    },
    msgSendBy: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const messageModel = model('Message', messagesSchema); 
export default messageModel;