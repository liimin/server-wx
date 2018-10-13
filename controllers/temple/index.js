const __base=require('../common/base')('temple')
const path = require('path')
// const WechatAPI = require('co-wechat-api'); 
const {response}=__base;
const templeService=__base.Sevice
const fs = require('fs')
// const appid = 'wx234e93d08a91a96d';  
// const appsecret = '021c91f5b0f0a9a08ac1583425240f00';  
// const wxapi = new WechatAPI(appid, appsecret); 
const wxpay_config = require('../../config/wxpay');
const tenpay = require('tenpay');
const { appid,mchid,partnerKey,pfx,notify_url,spbill_create_ip } =wxpay_config;
const config = {
    appid,
    mchid,
    partnerKey,
    pfx: fs.readFileSync(path.join(__dirname,'../../config/cert/apiclient_cert.p12')),
    notify_url,
    spbill_create_ip
};
const api = new tenpay(config, true);

class templeController {
    /**
     * 获取祝福语列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getBlessionsList(ctx) {
        try {
            const data =await templeService.getBlessionsList(ctx.query)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
    /**
     * 
     */
    static async getSignature(ctx) {
        try {
            let result = await api.unifiedOrder({
                out_trade_no: '20180701'+Math.random().toString().substr(2, 10),
                body: '商品简单描述',
                total_fee: 1,
                openid: 'liimin',
                spbill_create_ip: get_ip() //ip地址
              });
            //   console.log(result);
            response.SUCCESS(result,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
        function get_ip () { //获取用户的真实ip
            let ip = ctx.request.get("X-Real-IP") || ctx.request.get("X-Forwarded-For") || ctx.request.ip
            if (ip.split(',').length > 0) {
                ip = ip.split(',')[0]
            }
            return ip.replace('::ffff:','')
        }
    }

    static async lightOn(ctx) {
        try {
            const data =await templeService.lightOn(ctx.request.body)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
    static async lightOff(ctx) {
        try {
            const data =await templeService.lightOff(ctx.request.body)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = templeController