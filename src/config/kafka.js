const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const admin = kafka.admin()
const producer = kafka.producer();
const consumer = kafka.consumer({groupId: 'dream_user'})


module.exports = {
    kafka,
    producer,
    consumer,
    admin
}

