const __base = require('../common/base')
const BlessionsService = __base('blessions');
const helper = require('../common/helper');
const request = require('request')
const fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块
const util = require('../../util/util')
class TempleSevice {
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBlessionsList(params) {
        let {
            type
        } = params
        const Pager = helper.PageEx(params)
        const {
            limit,
            offset
        } = Pager
        const where = type ? {
            type
        } : null
        const ret = await BlessionsService.findAndCountAll({
            limit,
            offset,
            where
        });
        return helper.GetReturnObj(Pager, ret)
    }

    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getTempleDetail(params) {
        let {
            id
        } = params
        var file = path.join(__dirname, `../../public/${id}/content.json`); //文件路径，__dirname为当前运行js文件的目录
        const res = await util.readFileAsync(file)
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
        request.get('http://59.110.235.8:9667/test_on?sn=8661040278229830&index=0001').on('error', function (err) {
            console.log(err)
        })
    }
    static async lightOff(formData) {
        console.log("===================================off")
        request.get('http://59.110.235.8:9667/test_off?sn=8661040278229830&index=0001').on('error', function (err) {
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
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBrandWCPayRequestParams(params) {
        const req = params
        const {
            payment
        } = req
        var order = {
            body: '吮指原味鸡 * 1',
            attach: '{"部位":"三角"}',
            out_trade_no: 'kfc' + (+new Date),
            total_fee: 1,
            spbill_create_ip: req.ip,
            openid: req.openid,
            trade_type: 'JSAPI'
        };

        return new Promise(function (resolve, reject) {
            payment.getBrandWCPayRequestParams(order, function (err, payargs) {
                resolve({
                    code: 200,
                    data: payargs
                })
            });
        })
        // return helper.GetReturnObj(Pager,ret)
    }

    /**
     * 获取微信用户信息
     * @returns {Promise<*>}
     */
    static async getWXOpenId(params) {
        let {
            code,
            appid,
            appsecret
        } = params
        let tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
        return new Promise((resolve, reject) => {
            request(tokenUrl, (error, response, body) => {
                if (response && response.statusCode && response.statusCode === 200) {
                    try {
                        resolve({
                            code: 200,
                            data: payargs
                        })
                    } catch (e) {
                        reject(e)
                    }
                }
            });
        })
    }

    static async getWXUserInfo(data, callback) {
        var tokenUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}&lang=zh_CN`;
        request(tokenUrl, function (error, response, body) {
            if (response && response.statusCode && response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                    body.access_token = data.access_token;
                    body.refresh_token = data.refresh_token;
                } catch (e) {
                    body = null;
                }
                callback && callback(body);
            }
        });
    }
}

module.exports = TempleSevice