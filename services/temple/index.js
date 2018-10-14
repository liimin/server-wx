const __base=require('../common/base')
const BlessionsService=__base('blessions');
const helper= require('../common/helper');
const request =require('request')
const fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块
const util = require('../../util/util')
class TempleSevice {
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBlessionsList(params) {
        let { type } =params
        const Pager=helper.PageEx(params)
        const { limit,offset } =Pager
        const where = type ? { type } : null
        const ret = await BlessionsService.findAndCountAll({
            limit,
            offset,
            where
        });
        return helper.GetReturnObj(Pager,ret)
    }

    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getTempleDetail(params) {
        let { id } =params
        var file = path.join(__dirname, `../../public/${id}/content.json`); //文件路径，__dirname为当前运行js文件的目录
        const res= await util.readFileAsync(file)
        return {
            code: 200,
            data: JSON.parse(res.toString())
        } 
        // return helper.GetReturnObj(Pager,ret)
    }

    static async lightOn(formData) {
    //     const url='http://59.110.235.8:9667/lighton'
    //     const { amount  ,tampleName,words,to_addr,tel,to_birth,name,temple_id,to,to_phone,lights} =formData
    //     const params ={
    //         "text":words,
    //         "money":amount*100,
    //         "temple":tampleName,
    //         "temple_id":temple_id,
    //         "user":{
    //             "name": name,//！祈福人微信
    //             "to":to,
    //             "to_birth":to_birth,
    //             "phone":tel,
    //             "to_phone":tel,
    //             "to_addr":to_addr
    //         },
    //         "lights":lights
    //     }
    //     console.info(params)
    //    // let { sign,text,money,  temple,temple_id,lights,user } =params
    //     request.post({url, form:formData}, function(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body) // 请求成功的处理逻辑  
    //         }else{
    //             console.log(error)
    //         }
    //     })
    console.log("===================================on")
    request.get('http://59.110.235.8:9667/test_on?sn=8661040278229830&index=0001').on('error', function(err) {
        console.log(err)
      })
    }
    static async lightOff(formData) {
        console.log("===================================off")
        request.get('http://59.110.235.8:9667/test_off?sn=8661040278229830&index=0001').on('error', function(err) {
            console.log(err)
          })
    //     const url='http://59.110.235.8:9667/lighton'
    //     const { amount  ,tampleName,words,to_addr,tel,to_birth,name,temple_id,to,to_phone,lights} =formData
    //     const params ={
    //         "text":words,
    //         "money":amount*100,
    //         "temple":tampleName,
    //         "temple_id":temple_id,
    //         "user":{
    //             "name": name,//！祈福人微信
    //             "to":to,
    //             "to_birth":to_birth,
    //             "phone":tel,
    //             "to_phone":tel,
    //             "to_addr":to_addr
    //         },
    //         "lights":lights
    //     }
    //     console.info(params)
    //    // let { sign,text,money,  temple,temple_id,lights,user } =params
    //     request.post({url, form:formData}, function(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body) // 请求成功的处理逻辑  
    //         }else{
    //             console.log(error)
    //         }
    //     })
    }
}

module.exports = TempleSevice
