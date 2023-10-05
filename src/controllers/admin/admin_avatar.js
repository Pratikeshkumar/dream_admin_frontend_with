// add avatar
// get avatar
// update avatar
// edit avatar

const logger = require('../../utils/logger')
const { Avatar } = require('../../models')

const addAvatar = async (req, res) => {
    logger.info('INFO -> ADDING AVATAR API CALLED');
    try {
        const { avatar_url } = req.body;

        // Create a new avatar
        const newAvatar = await Avatar.create({
            avatar_url,
        });

        res.status(201).json({ message: 'Avatar added successfully', data: newAvatar });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}


const getAvatars = async (req, res) => {
    logger.info('INFO -> GETTING AVATARS API CALLED');
    try {
        const { page = 1, perPage = 10 } = req.query;

        // Calculate the offset based on the page and perPage values
        const offset = (page - 1) * perPage;

        // Retrieve avatars with pagination
        const avatars = await Avatar.findAndCountAll({
            limit: perPage,
            offset,
        });

        res.status(200).json({
            message: 'Avatars retrieved successfully',
            data: avatars.rows,
            total: avatars.count,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}


const updateAvatar = async (req, res) => {
    logger.info('INFO -> UPDATING AVATAR API CALLED');
    try {
        const { id } = req.params; // Assuming you have an 'id' parameter in the route
        const { avatar_url } = req.body;

        // Find the avatar by ID
        const existingAvatar = await Avatar.findByPk(id);

        if (!existingAvatar) {
            return res.status(404).json({ message: 'Avatar not found' });
        }

        // Update the avatar URL
        existingAvatar.avatar_url = avatar_url;

        // Save the updated avatar to the database
        await existingAvatar.save();

        res.status(200).json({ message: 'Avatar updated successfully', data: existingAvatar });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}

const deleteAvatar = async (req, res) => {
    logger.info('INFO -> DELETING AVATAR API CALLED');
    try {
        const { id } = req.params; // Assuming you have an 'id' parameter in the route

        // Find the avatar by ID
        const existingAvatar = await Avatar.findByPk(id);

        if (!existingAvatar) {
            return res.status(404).json({ message: 'Avatar not found' });
        }

        // Delete the avatar from the database
        await existingAvatar.destroy();

        res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}


module.exports = {
    addAvatar,
    getAvatars,
    deleteAvatar,
    updateAvatar
}