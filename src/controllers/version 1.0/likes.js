const logger = require('../../utils/logger');
const { User, Avatar, Transaction, Gift, Video, Like } = require("../../models");


const addLike = async (req, res, next) => {
    logger.info("Like: Like added to people");
    try {
        const {
            video_id,
            reciever_id,
        } = req.body;
        const { id, email } = req.userData;
        const sender_id = id;
        let sended_likes = await Like.create({
            video_id,
            reciever_id,
            sender_id
        })
        // sended_likes = JSON.parse(JSON.stringify(sended_likes));
        if (!sended_likes) throw errorHandler("Unexpected error occured while creating user!", "badRequest");
        async function updateUserLike(userId) {
            try {
                const user = await Video.findByPk(userId);
                if (!user) {
                    console.log('User not found');
                    return;
                }
                const currentLike = user.like || 0;
                const newLike = currentLike + 1;
                let updated_like = await Video.update(
                    { like: newLike },
                    {
                        where: { id: video_id, },
                    }
                );
                // updated_like = JSON.parse(JSON.stringify(updated_like));

                res.status(201).json({
                    message: 'transaction_successfull',
                    ...updated_like
                })

                console.log('User likes updated successfully!');
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        updateUserLike(video_id);

    } catch (error) {
        logger.error(error)
    }
}


module.exports = {
    addLike
}