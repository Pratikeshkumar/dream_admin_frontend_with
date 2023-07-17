const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { testDbConnection } = require("./src/config/db");
const { headers } = require("./src/middlewares/headers");
const errorHandling = require('./src/utils/apiError');
const errorHandler = require('./src/middlewares/errorHandler');
const log = require('./src/utils/logger');
const AWS = require('aws-sdk')
const { s3 } = require('./src/config/aws')
const { Avatar, User, Hobbies } = require('./src/models')
const axios = require('axios')
const cheerio = require('cheerio')



s3.listBuckets((err, data) => {
  if (err) {
    console.log("connection error with aws cli")
  } else {
    console.log("connected to aws :", data.Buckets)
  }
})

const fetch_hobbies = async () => {
  const url = 'https://en.wikipedia.org/wiki/List_of_hobbies';
  const web_data = await axios.get(url)
  const $ = cheerio.load(web_data.data)

  const hobbies = []

  $('li').each((index, element) => {
    const hobbyText = $(element).text().trim();
    if (hobbyText.length > 0 &&
      !hobbyText.includes('unwanted') &&
      !hobbyText.startsWith('[') &&
      !hobbyText.endsWith(']') &&
      !hobbyText.includes('\n')  &&
      !hobbyText.includes('Main page') && 
      !hobbyText.includes('Contents') &&
      !hobbyText.includes('Current events') &&
      !hobbyText.includes('Random article') &&
      !/^\d+\.\d/.test(hobbyText)
     ){
    hobbies.push($(element).text().trim());
  }

});
}

fetch_hobbies()


const router = require("./src/routes/index");

const app = express();
// require('./src/config/testdb')

app.use(headers);
testDbConnection();
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./src/uploads"));
app.use(cookieParser());

app.use("", router);

/****************** ERORR HANDLING */
// error handlers for not found
app.use((req, res, next) => {
  log.error("*************** API NOT FOUND ***************")
  next(new errorHandling("route not found", "notFound"));
});

// error handler
app.use(errorHandler);

module.exports = app;



