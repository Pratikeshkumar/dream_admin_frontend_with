const logger = require("../../utils/logger")
const { LiveSettings, User } = require('../../models')
const { kafka, producer, admin } = require('../../config/kafka')








const addLiveSettings = async (req, res) => {
    logger.info('INFO -> ADDING LIVE SETTINGS API CALLED')
    try {
        const { id } = req.userData;
        const {
            topic,
            description,
            live_gift_allowed,
            audience_control_only_eighteen_plus,
            comment_allowed,
            filter_comment_allowed,
            mute_voice,
            supervisors_role,
            secreterial_role,
            administration_role,
            supervisors_list,
            secreterial_list,
            administration_list,
            main_stream_url,
            live_active 
        } = req.body;
        const data = {
            user_id: id,
            topic,
            description,
            live_gift_allowed,
            audience_control_only_eighteen_plus,
            comment_allowed,
            filter_comment_allowed,
            mute_voice,
            supervisors_role: [supervisors_role],
            secreterial_role: [secreterial_role],
            administration_role: [administration_role],
            supervisors_list,
            secreterial_list,
            administration_list,
            main_stream_url,
            live_active: true
        }
        let result = await LiveSettings.create({
            user_id: id,
            topic,
            description,
            live_gift_allowed,
            audience_control_only_eighteen_plus,
            comment_allowed,
            filter_comment_allowed,
            mute_voice,
            supervisors_role: [supervisors_role],
            secreterial_role: [secreterial_role],
            administration_role: [administration_role],
            supervisors_list,
            secreterial_list,
            administration_list,
            main_stream_url,
            live_active: true
        })
        if (!result) { res.status(res.status(500).json({ message: 'Error generated while processing your request' })) }
        result = JSON.parse(JSON.stringify(result))
        const live_setting_topic = `${id}-${result?.id}-live_settings`;
        const viewers_counts_topic = `${id}-${result?.id}-viewers_count`;
        const gift_handle_topic = `${id}-${result?.id}-gift_handler`;
        const rose_handler_topic = `${id}-${result?.id}-rose_handler`;
        const comment_handler_topic = `${id}-${result?.id}-comment_handler`;
        const multiple_people_handler_topic = `${id}-${result?.id}-multiple_people_handler`;
        const like_counts_topic = `${id}-${result?.id}-like_counts`;
        const question_and_answer_handler_topic = `${id}-${result?.id}-question_and_answer_handler`
        const poll_handler_topic = `${id}-${result?.id}-poll_handler`

        const viewers_topicConfig = { topic: viewers_counts_topic }
        const gift_topicConfig = { topic: gift_handle_topic }
        const rose_topicConfig = { topic: rose_handler_topic }
        const comment_topicConfig = { topic: comment_handler_topic }
        const multiple_people_topicConfig = { topic: multiple_people_handler_topic }
        const like_topicConfig = { topic: like_counts_topic }
        const question_and_answer_topicConfig = { topic: question_and_answer_handler_topic }
        const poll_topicConfig = { topic: poll_handler_topic }
        await admin.connect()
        await admin.createTopics({ topics: [viewers_topicConfig] })
        await admin.createTopics({ topics: [gift_topicConfig] })
        await admin.createTopics({ topics: [rose_topicConfig] })
        await admin.createTopics({ topics: [comment_topicConfig] })
        await admin.createTopics({ topics: [multiple_people_topicConfig] })
        await admin.createTopics({ topics: [like_topicConfig] })
        await admin.createTopics({ topics: [question_and_answer_topicConfig] })
        await admin.createTopics({ topics: [poll_topicConfig] })
        logger.debug('ALL TOPIC FOR LIVE STREAM CREATED SUCCESSFULLY')
        await admin.disconnect()
        await producer.connect()
        await producer.send({
            topic: live_setting_topic,
            messages: [
                { value: JSON.stringify(data) }
            ]
        })
        logger.debug('KAFKA TOPIC CREATED AND DATA INSERTED IN THEM')
        await producer.disconnect()
        logger.debug('KAFKA PRODUCER DISCONNECED SUCCESSFULLY')
        res.status(200).json({
            success: true,
            result: result
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'Error generated whole processing you request', error })
    }
}














const updateActiveLive = async (req, res) => {
    logger.info('INFO -> LIVE STATUS UPDATING API CALLED')
    try {
        const { id } = req.userData;
        const { live_active } = req.body;

        let result = await LiveSettings.update(
            { live_active: live_active },
            { where: { user_id: id } }
        )
        res.status(200).json({
            success: true,
            message: 'successfully updated'
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ message: 'Error generated while processing your request', error })
    }

}


const getAllActiveLiveStream = async (req, res) => {
    logger.info('INFO -> GETTING ACTIVE LIVE STREAM API CALLED');
    try {
        const { pageNo, pageSize } = req.params;
        let page_no = Number(pageNo);
        let page_size = Number(pageSize);

        // Calculate the offset based on page number and page size
        const offset = (page_no - 1) * page_size;

        let result = await LiveSettings.findAndCountAll({
            where: { live_active: true },
            limit: page_size,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'nickname', 'profile_pic'],
                }
            ],
            offset: offset,
        });

        if (result.count === 0) {
            res.status(204).json({
                success: false,
                message: 'No active live streams found'
            });
        } else {
            res.status(200).json({
                success: true,
                result: result.rows,
                totalCount: result.count,
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request' });
    }
}











module.exports = {
    addLiveSettings,
    updateActiveLive,
    getAllActiveLiveStream
}