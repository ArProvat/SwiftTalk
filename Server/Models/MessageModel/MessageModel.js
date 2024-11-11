const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    text:{
        type: 'string',
        default: ''
    },
    imageUrl:{
        type: 'string',
        default: ''
    }, 
    VideoUrl:{
        type: 'string',
        default: ''
    },
    seen:{
        type: 'boolean',
    },
},{
timestamps:true
})

const messageModel = new mongoose.Model('message',messagesSchema)

module.exports = messageModel;