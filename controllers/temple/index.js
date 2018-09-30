const __base=require('../common/base')('blessions')
const WechatAPI = require('co-wechat-api'); 
const {response}=__base;
const blessionsService=__base.Sevice
const appid = 'wxfde88c18aee20f23';  
const appsecret = '021c91f5b0f0a9a08ac1583425240f00';  
const wxapi = new WechatAPI(appid, appsecret);  
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
            const data = await wxapi.getJsConfig({  
                url: ctx.request.header.referer,  
            });
            console.log(ctx.request.header.referer)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = templeController