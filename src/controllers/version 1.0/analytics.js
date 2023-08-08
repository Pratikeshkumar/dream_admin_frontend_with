const logger = require("../../utils/logger")
const { Gift } = require('../../models')



const getDiamondAnalytics = async (req, res) => {
    logger.info('INFO -> DIAMOND ANALYTICS API CALLED')
    try {
        let { startingtime, endingTime } = req.params;
        const { id } = req.userData;

        let result = await Gift.findAll({
            where: { 
                reciever_id: id,
                
             }
        })

        result = JSON.parse(JSON.stringify(result))
        res.status(201).json({
            message: 'success',
            payload: result
        })


       

    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'error while fetching diamond analytics, Please try after some time' })
    }

}


module.exports = {
    getDiamondAnalytics
}