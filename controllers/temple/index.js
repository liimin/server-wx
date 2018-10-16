const __base = require('../common/base')('temple')
// const path = require('path')
const {
    response
} = __base;
const templeService = __base.Sevice
// var sha1 = require('sha1')
// const fs = require('fs')
// const wxpay_config = require('../../config/wxpay');
// const {
//     appID,
//     mchId,
//     partnerKey,
//     appSecret,
//     token,
//     notifyUrl,
// } = wxpay_config;
// const util = require('../../util/util')
// const Wechat = require('../../wechat/wechat')
// const wechat_file = path.join(__dirname, '../../config/wechat.txt')
// const config = {
//     wechat: {
//         appID,
//         appSecret,
//         token,
//         getAccessToken: function () {
//             return util.readFileAsync(wechat_file)
//         },
//         saveAccessToken: function (data) {
//             data = JSON.stringify(data)
//             return util.writeFileAsync(wechat_file, data)
//         }
//     }
// }

// // const wxapi = new WechatAPI(appid, appsecret); 
// // const wxpay_config = require('../../config/wxpay');
// // const tenpay = require('tenpay');
// // const { appid,mchid,partnerKey,pfx,notify_url,spbill_create_ip } =wxpay_config;
// // const config = {
// //     appid,
// //     mchid,
// //     partnerKey,
// //     pfx: fs.readFileSync(path.join(__dirname,'../../config/cert/apiclient_cert.p12')),
// //     notify_url,
// //     spbill_create_ip
// // };
// // const api = new tenpay(config, true);

// const Payment = require('wechat-pay').Payment;

// const initConfig = {
//     partnerKey,
//     appId:appID,
//     mchId,
//     notifyUrl,
//     pfx: fs.readFileSync(path.join(__dirname, '../../config/cert/apiclient_cert.p12'))
// };
// const payment = new Payment(initConfig);

class templeController {
    /**
     * 获取祝福语列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getBlessionsList(ctx) {
        try {
            const data = await templeService.getBlessionsList(ctx.query)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    /**
     * 获取寺庙详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getTempleDetail(ctx) {
        try {
            const data = await templeService.getTempleDetail(ctx.query)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    /**
     * access_token 管理
     */
    static async access_token(ctx) {
        try {
            const cfg = config.wechat
            var wechat = new Wechat(cfg)
            const {
                signature,
                nonce,
                timestamp,
                echostr
            } = ctx.query
            var token = cfg.token
            var str = [token, timestamp, nonce].sort().join('')
            var sha = sha1(str)
            if (sha === signature) {
                ctx.body = echostr + ''
            } else {
                ctx.body = 'wrong'
            }
        } catch (e) {
            ctx.body = 'wrong'
        }
    }

    static async lightOn(ctx) {
        try {
            const data = await templeService.lightOn(ctx.request.body)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    static async lightOff(ctx) {
        try {
            const data = await templeService.lightOff(ctx.request.body)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }

    static async getBrandWCPayRequestParams(ctx) {
        try {
            const params = ctx.request.body
            params.payment = payment
            params.ip= util.get_ip(ctx)
            const data = await templeService.getBrandWCPayRequestParams(params)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }

    static async getWXOpenId(ctx) {
        try {
            const params= ctx.request.body
            params.appid=appid
            params.appsecret =appsecret
            const data = await templeService.getWXOpenId(params)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }

}
module.exports = templeController