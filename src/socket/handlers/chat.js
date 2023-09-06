const logger = require('../../utils/logger')
const { Message, User } = require('../../models/index')
const { admin } = require('../../../firebaseAdmin')


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

        const roomSize = io.sockets.adapter.rooms.get(roomId).size;
        if (roomSize && roomSize > 1) {
            io.to(roomId).emit('customEventResponse', data[0])
        } else {
            const id = roomId - user?._id;
            let devices_token = await User.findByPk(id, {
                attributes: ['device_token']
            })
            let token = JSON.parse(JSON.stringify(devices_token)).device_token
            await admin.messaging().sendEachForMulticast({
                tokens: [token],
                data: {
                    notifee: JSON.stringify({
                        body: data[0]?.text,
                        android: {
                            channelId: 'default',
                            actions: [
                                {
                                    title: 'message',
                                    pressAction: {
                                        id: 'read'
                                    }
                                }
                            ]
                        }
                    })
                }
            })


        }


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
