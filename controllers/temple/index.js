const __base=require('../common/base')('blessions')
const path = require('path')
// const WechatAPI = require('co-wechat-api'); 
const {response}=__base;
const blessionsService=__base.Sevice
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
            const data =await blessionsService.getBlessionsList(ctx.query)
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
                out_trade_no: '1',
                body: '商品简单描述',
                total_fee: 1,
                openid: '1000'
              });
            //   console.log(result);
            response.SUCCESS(result,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = templeController