const { User } = require("../../models");
const logger = require("../../utils/logger")
const { Op } = require('sequelize')

const searchUser = async (req, res) => {
    logger.info('INFO -> SEARCH API CALLED FOR SEARCHING THE PEOPLE')
    try {
        let { text } = req?.params;
        let data = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        nickname: {
                            [Op.like]: `%${text}%`
                        }
                    },
                    {
                        username: {
                            [Op.like]: `%${text}%`
                        }
                    }
                ]
            },
            include: [
                { model: User, as: 'Followers', attributes: ['id'] },
                { model: User, as: 'Following', attributes: ['id'] }
            ],
            attributes: {
                exclude: ['password', 'email', 'auth_token']
            }
        });

        res.status(200).json({ data });
    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'error occurred while searching. Please try again after some time' });
    }
}



module.exports = {
    searchUser
}