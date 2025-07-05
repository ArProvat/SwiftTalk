import express from 'express';
const app = express();
import { Server } from 'socket.io';
import { createServer } from 'http';
import getUserByToken from '../helper/getUserByToken/getUserByToken.js';
// Corrected import for UsersModel:
import UsersModel from '../Models/UsersModel/UsersModel.js'; // Assuming 'UsersModel' is the default export
import ConversationModel from '../Models/ConvarsationModel/ConversationModel.js'; // Assuming 'ConversationModel' is the default export and added .js extension
import MessageModel from '../Models/MessageModel/MessageModel.js'; // Assuming 'MessageModel' is the default export
import GetConversation from '../helper/getConversion/GetConversion.js';

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

const OnlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('connection', socket.id);

    try {
        const token = socket.handshake.auth.token;
        const user = await getUserByToken(token);

        socket.join(user._id.toString());
        OnlineUsers.add(user._id.toString());
        io.emit('onlineUsers', Array.from(OnlineUsers));

        socket.on('message_page', async (data) => {
            try {
                // Use UsersModel.findById
                const userDetails = await UsersModel.findById(data).select('-password');
                if (!userDetails) {
                    return socket.emit('error', 'User not found');
                }

                const payload = {
                    User_id: userDetails._id,
                    name: userDetails.name,
                    email: userDetails.email,
                    photo: userDetails.photoUrl,
                    online: OnlineUsers.has(data)
                };
                socket.emit('message_user', payload);
                // Use ConversationModel.findOne
                const PreviousConversion = await ConversationModel.findOne({
                    $or: [
                        { sender: user._id, receiver: data },
                        { sender: data, receiver: user._id },
                    ]
                }).populate('messages').sort({ updatedAt: -1 });

                socket.emit('message', PreviousConversion?.messages || []);


            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        socket.on('new message', async (data) => {
            try {
                console.log(data)
                if (!data.sender || !data.receiver && (!data.text || !data.FileUrl)) {
                    return socket.emit('error', 'Invalid message data');
                }

                // Use ConversationModel.findOne
                let conversion = await ConversationModel.findOne({
                    $or: [
                        { sender: data.sender, receiver: data.receiver },
                        { sender: data.receiver, receiver: data.sender },
                    ]
                });

                if (!conversion) {
                    // Use ConversationModel.create
                    conversion = await ConversationModel.create({
                        sender: data.sender,
                        receiver: data.receiver,
                    });
                }

                // Use MessageModel.create
                const CreateMessage = await MessageModel.create({
                    text: data.text || '',
                    fileDetails: {
                        Url: data.fileDetails?.Url || '', // Added optional chaining for safety
                        Format: data.fileDetails?.Format || '', // Added optional chaining for safety
                    },
                    msgSendBy: data.sender,
                });

                // Use ConversationModel.findByIdAndUpdate
                await ConversationModel.findByIdAndUpdate(
                    conversion._id,
                    { $push: { messages: CreateMessage._id } },
                    { new: true }
                );

                // Use ConversationModel.findById
                const getConversation = await ConversationModel.findById(conversion._id)
                    .populate('messages')
                    .sort({ updatedAt: -1 });

                io.to(data.receiver).emit('message', getConversation.messages || []);
                io.to(data.sender).emit('message', getConversation.messages || []);
                const conversationSender = await GetConversation(data.sender)
                const conversationReceiver = await GetConversation(data.receiver)

                io.to(data.sender).emit('conversation', conversationSender)
                io.to(data.receiver).emit('conversation', conversationReceiver)
            } catch (error) {
                console.error('Message send error:', error);
                socket.emit('error', error.message);
            }
        });

        socket.on('sidebar', async (userId) => {
            const conversation = await GetConversation(userId);
            socket.emit('conversation', conversation)

        })

        socket.on('seen', async (msgbyuserId) => {
            console.log(msgbyuserId)

            // Use ConversationModel.findOne
            const conversation = await ConversationModel.findOne({
                $or: [
                    {
                        sender: user?._id, receiver: msgbyuserId
                    },
                    {
                        sender: msgbyuserId, receiver: user?._id
                    }
                ]
            })

            const conversationMessageIds = conversation?.messages || []

            // Use MessageModel.updateMany
            const updateMessage = await MessageModel.updateMany({
                _id: { '$in': conversationMessageIds }, msgSendBy: msgbyuserId
            }, { "$set": { seen: true } })


            const conversationSender = await GetConversation(user?._id.toString())
            const conversationReceiver = await GetConversation(msgbyuserId)

            io.to(user?._id.toString()).emit('conversation', conversationSender)
            io.to(msgbyuserId).emit('conversation', conversationReceiver)

        })


        socket.on('disconnect', () => {
            OnlineUsers.delete(user._id);
            io.emit('onlineUsers', Array.from(OnlineUsers));
            console.log('disconnect', socket.id);
        });
    } catch (error) {
        console.error('Connection error:', error);
    }
});

export {
    app,
    server,
};