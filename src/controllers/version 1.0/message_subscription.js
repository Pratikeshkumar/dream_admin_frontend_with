const logger = require("../../utils/logger")
const { MessageSubscription } = require('../../models')

const getMessageSubscription = async (req, res) => {
    logger.info('INFO -> MESSAGE SUBSCRIPTION API CALLED')
    try {
        const { id } = req.userData;
        const sender_id = id
        let {
            reciever_id,
            no_of_diamond,
            no_of_allowed_messages,
        } = req.body;

        let message_subscription = await MessageSubscription.create({
            sender_id,
            reciever_id,
            no_of_diamond,
            no_of_allowed_messages,
        })
        message_subscription = JSON.parse(JSON.stringify(message_subscription))
        res.status(201).json({
            message: 'success',
            payload: message_subscription
        })

    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'error while taking message sunscription, Please try again after some time' })
    }
}

module.exports = {
    getMessageSubscription
}