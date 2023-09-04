const logger = require('../../utils/logger')
const { Message } = require('../../models/index')


module.exports = (socket, io) => {


    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log('user joined', roomId)
    });

    socket.on('message', (roomId, message) => {
        io.to(roomId).emit('message', message);
        console.log(`Message in room ${roomId}:`, message);
    });




    socket.on('customEvent', async (data) => {
        const {
            id,
            senderId,
            receiverId,
            text,
            type,
            image,
            video,
            document,
            parentMessageId,
            isRead,
            audio,
            color,
            createdAt,
            user,
            _id,
            roomId
        } = data[0]
        io.to(roomId).emit('customEventResponse', data[0])
        try {
            const newMassage = await Message.create({
                senderId,
                receiverId,
                text,
                image,
                video,
                document,
                isRead,
                audio,
                color
            })
        } catch (error) {
            logger.error(error)
        }

    })
};
