const __base = require('../common/base')
const BlessionsService = __base('blessions');
const helper = require('../common/helper');
const request = require('request')
const path = require('path'); //系统路径模块
const util = require('../../util/util')
const __server = `http://59.110.235.8:9667/`
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
        try {
            let {
                id
            } = params
            var file = path.join(__dirname, `../../public/${id}/content.json`); //文件路径，__dirname为当前运行js文件的目录
            const res = await util.readFileAsync(file)
            return {
                code: 200,
                data: JSON.parse(res.toString())
            }
        } catch (error) {
            console.log(error)
        }
        // return helper.GetReturnObj(Pager,ret)
    }

    static async lightOn(formData) {
        console.log("===================================on")
        const url = `${__server}/lighton`
        const {
            amount,
            tampleName,
            words,
            to_addr,
            tel,
            to_birth,
            name,
            temple_id,
            to,
            to_phone,
            lights
        } = formData
        const params = {
            "text": words,
            "money": amount * 100,
            "temple": tampleName,
            "temple_id": temple_id,
            "user": {
                "name": name, //！祈福人微信
                "to": to,
                "to_birth": to_birth,
                "phone": tel,
                "to_phone": tel,
                "to_addr": to_addr
            },
            "lights": lights
        }
        const sign = util.getSign(params)
        params.sign = sign
        console.info(params)
        return new Promise(function (resolve, reject) {
            request.post({
                url,
                form: params
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body) // 请求成功的处理逻辑 
                    resolve(body) 
                } else {
                    console.log(error)
                    reject(error)
                }
            })
        })
    }
    static async lightOff(formData) {
        console.log("===================================off")
        request.get('http://59.110.235.8:9667/test_off?sn=8661040278229830&index=0001').on('error', function (err) {
            console.log(err)
        })
    }
    
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getTempleDevice(params) {
        try {
            let {
                temple_id
            } = params
            const sign = util.getSign({temple_id})
            // const url = `${helper.ServerBase}/get_status?temple_id=1&sign=${sign}`
            const url = `${helper.ServerBase}/get_status`
            return new Promise(resolve=>{
                request.post({
                    url,
                    form: JSON.stringify({temple_id:'1',sign:'11',temple:'xxx'})
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body) // 请求成功的处理逻辑 
                        resolve(JSON.parse(body)) 
                    } else {
                        console.log(error)
                        reject(error)
                    }
                })
                // request.get(url,(e,r,body)=> {
                //     console.log(body)
                //     body=(JSON.parse(body));
                //     resolve({
                //         code:body.errcode,
                //         msg: body.errmsg
                //     })
                // }).on('error', (response)=> {
                //     reject(error)
                // })
            })
            // return {
            //     code: 200,
            //     data: JSON.parse(res.toString())
            // }
        } catch (error) {
            console.log(error)
        }
        // return helper.GetReturnObj(Pager,ret)
    }
}

module.exports = TempleSevice