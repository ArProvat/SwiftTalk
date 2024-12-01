const express = require('express')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const { Socket } = require('dgram')
const getUserByToken = require('../helper/getUserByToken/getUserByToken')
const userModel = require('../Models/UsersModel/UsersModel')
const { promiseHooks } = require('v8')

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
})

const OnlineUsers = new Set()

io.on('connection', async (Socket) => {
    console.log('connection', Socket.id)

    const token = Socket.handshake.auth.token

    user = await getUserByToken(token)
    Socket.join(user._id)
    OnlineUsers.add(user._id.toString())
    io.emit('onlineUsers', Array.from(OnlineUsers))

    Socket.on('message_page',async(data) =>{
        console.log('message_page', data)
        const userDetails = await userModel.findById(data).select('-password')
        const payload = {
            User_id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            photo: userDetails.photoUrl,
            online: OnlineUsers.has(data)
        }
        Socket.emit('message_user', payload)
    })

    Socket.on('disconnect', () => {
        OnlineUsers.delete(user._id)
        io.emit('onlineUsers', Array.from(OnlineUsers));
        console.log('disconnect', Socket.id)
    })
})

module.exports = {
    app,
    server,
}