const { kafka, admin, producer } = require('../../config/kafka')
const logger = require('../../utils/logger')

const live_count = async (socket, io) => {
    const user = socket?.userData;
    const consumer = kafka.consumer({ groupId: user?.username })
    await consumer.connect()
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('topic', topic)
            console.log('partition', partition)
            console.log('message', JSON.parse(message))
        },
    })
   


    // for starting the live stream 
    socket.on('start_live_stream', async (data) => {
        console.log('data', data)
        const id = user?.id;
        const live_setting_topic = `${id}-${data?.id}-live_settings`;
        const viewers_counts_topic = `${id}-${data?.id}-viewers_count`;
        const gift_handle_topic = `${id}-${data?.id}-gift_handler`;
        const rose_handler_topic = `${id}-${data?.id}-rose_handler`;
        const comment_handler_topic = `${id}-${data?.id}-comment_handler`;
        const multiple_people_handler_topic = `${id}-${data?.id}-multiple_people_handler`;
        const like_counts_topic = `${id}-${data?.id}-like_counts`;
        const question_and_answer_handler_topic = `${id}-${data?.id}-question_and_answer_handler`
        const poll_handler_topic = `${id}-${data?.id}-poll_handler`
        const topicList = [live_setting_topic, viewers_counts_topic, gift_handle_topic, rose_handler_topic, comment_handler_topic, multiple_people_handler_topic, like_counts_topic, question_and_answer_handler_topic, poll_handler_topic]
        topicList?.map(async (item) => {
            await consumer.subscribe({ topic: item, fromBeginning: true })
        })
        consumer.disconnect()
       

    })


    // for handeling the viewers counts
    socket.on('viewers_counts', async (data) => {
        console.log('viewers_count_data_displaying', data)
        await producer.connect()
        await producer.send({
            topic: data?.topic_name,
            messages: [
                { value: JSON.stringify(data) }
            ]
        })
        logger.info('successfull published the data to a topic')
    })


    // for handling the gift sending
    socket.on('gift_handler', (data) => {
        console.log(data)
    })

    // for handling the rose sending 
    socket.on('rose_handler', (data) => {
        console.log(data)
    })

    // for handling the comment 
    socket.on('comment_handler', (data) => {
        console.log(data)
    })

    // for handling the multiple people joined
    socket.on('multiple_people_handler', (data) => {
        console.log(data)
    })

    // for handeling the like counts
    socket.on('like_counts', (data) => {
        console.log(data)
    })

    // for handling the questions and answer
    socket.on('question_and_answer_handler', (data) => {
        console.log(data)
    })

    // for handling the poll
    socket.on('poll_handler', (data) => {
        console.log(data)
    })








}





module.exports = {
    live_count
}