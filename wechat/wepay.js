const tenpay = require('tenpay')
var sha1 = require('sha1')
// const fs = require('fs')
const path = require('path')
const wxpay_config = require('./config/config');
const util = require('../util/util')
const Wechat = require('./wechat')
const wechat_file = path.join(__dirname, './config/wechat.txt')
const request = require('request-promise')
// const Payment = require('wechat-pay').Payment;

const {
  appID,
  mchId,
  partnerKey,
  appSecret,
  token,
  notifyUrl,
} = wxpay_config;

const config = {
  appID,
  appSecret,
  token,
  getAccessToken: function () {
    return util.readFileAsync(wechat_file)
  },
  saveAccessToken: function (data) {
    data = JSON.stringify(data)
    return util.writeFileAsync(wechat_file, data)
  }
}
const wechat = new Wechat(config)

const wechatConfig = {
  appid: appID,
  mchid: mchId,
  partnerKey: partnerKey,
  notify_url: notifyUrl, //微信异步通知的地址
}
const wechatApi = new tenpay(wechatConfig)

async function getPayParams(ctx) {
  //传过来的total_fee单位为：元，传给微信要转化为分
  const {
    out_trade_no,
    total_fee,
    body,
    openid
  } = ctx.request.body
  let result = await wechatApi.getPayParams({
    out_trade_no, //商户内部订单号
    body,
    total_fee: total_fee,//total_fee * 100, //订单金额(单位：分)
    spbill_create_ip: util.get_ip(), //ip地址
    openid
  })
  return result
}

async function access_token(ctx) {
  try {
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    var token = config.token
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)
    if (sha === signature) {
      ctx.body = echostr + ''
    } else {
      ctx.body = 'wrong'
    }
  } catch (e) {
    console.log(e)
    ctx.body = 'wrong'
  }
}

/**
 * 获取微信用户信息
 * @returns {Promise<*>}
 */
async function getWXUserInfo(ctx) {
  let {
    code,
  } = ctx.request.body
  let tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;
  try {
     const  { body,response } = await request(tokenUrl);
     if (response && response.statusCode && response.statusCode === 200) {
        const result  = JSON.parse(body)
        const { openid, access_token }  = result
        const infoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
        const  { body,response } =  await request(infoUrl);
        if (response && response.statusCode && response.statusCode === 200) {
          const wx_user_info = JSON.parse(body)
          wx_user_info['openid'] = openid
          wx_user_info['access_token']=access_token
          console.log(wx_user_info)
          ctx.body = {
            code:200,
            data : wx_user_info
          }
        }else{
          console.log('============================='+response.statusCode);
        }
      }else{
        console.log('============================='+response.statusCode);
      }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  wechatApi,
  getPayParams,
  access_token,
  getWXUserInfo,
}