module.exports = file=>{
    const Sevice = require(`../../services/${file}`)
    const response = require('../../util/response')
    return {
        Sevice,
        response
    }
 }
 