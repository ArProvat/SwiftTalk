import { Schema, model } from 'mongoose';


const ConversationSchema = new Schema({
    sender: {
        type : Schema.ObjectId,
        required : true ,
        ref:'User'
    },
    receiver:{
        type : Schema.ObjectId,
        required: true,
        ref:'User'
    },
    messages:[
        {
            type:Schema.ObjectId,
            ref:'Message'
        }
    ]
},{
    timestamps:true
})

const Conversation_model =  model('conversation', ConversationSchema)

export default Conversation_model;