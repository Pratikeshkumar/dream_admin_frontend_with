const logger = require("../../utils/logger")
const {Country} = require('../../models')
const {City} = require('../../models')



const getAllcountries = async (req, res, next)=>{
logger.info("getting all country ")

const countries = await Country.findAll()
// console.log(countries)
res.json(countries)
}




const getCitiesbyCode = async(req, res, next)=>{
    logger.info("getitng cities by country code")

    const country_code = req.query.q;

    
    const cities = await City.findAll({
        where: {
            country_code: country_code
          }  
    })
    res.json(cities)    

}


module.exports = {
    getAllcountries,
    getCitiesbyCode
}

