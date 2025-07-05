import ConvarsationModel from "../../Models/ConvarsationModel/ConversationModel.js"


const GetConversation = async (userId) => {
if(userId){
    const conversationUser = await ConvarsationModel.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    }).sort({ updatedAt: -1  }).populate('messages').populate('sender').populate('receiver')

    const conversation = conversationUser.map(con => {
        const countUnseen = con?.messages?.reduce((prev, curr) => {
            if (curr?.msgSendBy.toString() !== userId) {
                return prev + (curr?.seen ? 0 : 1)
            }
            else {
                return prev
            }

        }, 0)
        return {
            _id: con?._id,
            sender: con?.sender,
            receiver: con?.receiver,
            countUnseen: countUnseen,
            lastMessage: con?.messages[con?.messages.length - 1]
        }
    })
    return conversation }
    else {
        return []
    }

}
export default GetConversation