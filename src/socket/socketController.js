const { Message } = require('../models/index')
const logger = require('../utils/logger')


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log('user joined', roomId)
    });

    socket.on('videoCall', async (data) => {
      const { offer, roomId, my_id } = data;
      io.to(roomId).emit('videoCallListener', { offer, my_id })
    })


    socket.on('sendOffer', async (data) => {
      const { answer, roomId, my_id } = data;
      io.to(roomId).emit('answer', { answer, my_id })
    })



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

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
