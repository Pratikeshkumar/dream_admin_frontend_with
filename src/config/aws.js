const AWS = require('aws-sdk')
const { AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY } = require('dotenv').config()

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
})

 const s3 = new AWS.S3();

 module.exports = {s3}