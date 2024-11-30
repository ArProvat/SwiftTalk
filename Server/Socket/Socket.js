const express = require('express')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const { Socket } = require('dgram')
const getUserByToken = require('../helper/getUserByToken/getUserByToken')

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
    OnlineUsers.add(user._id)
    io.emit('onlineUsers', Array.from(OnlineUsers))

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