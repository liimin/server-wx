const __base=require('../common/base')
const BlessionsService=__base('blessions');
const helper= require('../common/helper');

class TempleSevice {
    static async login(formData) {
        const {username,password} = formData
        console.log(username,password)
    }
}

module.exports = TempleSevice
