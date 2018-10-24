const tenpay = require('tenpay')
var sha1 = require('sha1')
// const fs = require('fs')
const path = require('path')
const wxpay_config = require('./config/config');
const util = require('../util/util')
const Wechat = require('./wechat')
const wechat_file = path.join(__dirname, './config/wechat.txt')
var Promise = require('bluebird')
var request = Promise.promisifyAll(require('request'))
// const Payment = require('wechat-pay').Payment;

const {
  appID,
  mchId,
  partnerKey,
  appSecret,
  token,
  notifyUrl,
} = wxpay_config;

// const initConfig = {
//     partnerKey,
//     appId:appID,
//     mchId,
//     notifyUrl,
//     pfx: fs.readFileSync(path.join(__dirname, './config/cert/apiclient_cert.p12'))
// };
// const payment = new Payment(initConfig);

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

async function unifiedOrder(ctx) {
  //传过来的total_fee单位为：元，传给微信要转化为分
  const {
    out_trade_no,
    total_fee,
    body,
    openid
  } = ctx.request.body
  let fee = total_fee
  let result = await wechatApi.unifiedOrder({
    out_trade_no, //商户内部订单号
    body,
    total_fee: fee, //订单金额(单位：分)
    spbill_create_ip: util.get_ip(), //ip地址
    openid
  })
  return result
}

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
    total_fee: 1,//total_fee * 100, //订单金额(单位：分)
    spbill_create_ip: util.get_ip(), //ip地址
    openid
  })
  // let order = await wechatApi.unifiedOrder({
  //   out_trade_no, //商户内部订单号
  //   body,
  //   total_fee: fee * 100, //订单金额(单位：分)
  //   spbill_create_ip: util.get_ip(), //ip地址
  //   openid
  // })
  // let result = await api.getPayParamsByPrepay({
  //   order
  // });
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

async function getBrandWCPayRequestParams(ctx) {
  try {
    const {
      out_trade_no,
      total_fee,
      body,
      openid
    } = ctx.request.body
    const {
      payment
    } = req
    var order = {
      body,
      attach: '{"部位":"三角"}',
      out_trade_no,
      total_fee: 1,
      spbill_create_ip: req.ip,
      openid,
      trade_type: 'JSAPI'
    };
    const payargs = await payment.getBrandWCPayRequestParams(order)
    return payargs
  } catch (e) {
    console.log(e)
    ctx.body = 'wrong'
  }
}

/**
 * 获取微信用户openid
 * @returns {Promise<*>}
 */
async function getWXOpenId(ctx) {
  console.log('==========================================getWXOpenId')
  let {
    code,
  } = ctx.request.body
  console.log('=========================================='+code)
  let tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;
  try {
     const  { body,response } = await request(tokenUrl);
     if (response && response.statusCode && response.statusCode === 200) {
        const result  = JSON.parse(body)
        const { openid, access_token }  = result
        tokenUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
        const  { body,response } =  await request(tokenUrl);
        if (response && response.statusCode && response.statusCode === 200) {
          ctx.body = {
            code:200,
            data : Object.assign({},result,JSON.parse(body))
          }
        }
      }else{
        console.log('======================')
      }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 获取微信用户信息
 * @returns {Promise<*>}
 */
async function getWXUserInfo(ctx) {
  let {
    openid,
    access_token
  } = ctx.request.body
  // const access_token = wechat.getAccessToken()
  var tokenUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
  request(tokenUrl, function (error, response, body) {
    if (response && response.statusCode && response.statusCode === 200) {
      try {
        body = JSON.parse(body);
        body.access_token = data.access_token;
        body.refresh_token = data.refresh_token;
        ctx.body = body
      } catch (e) {
        body = null;
      }
    }
  });
}

module.exports = {
  unifiedOrder,
  wechatApi,
  getPayParams,
  access_token,
  getWXOpenId,
  getWXUserInfo,
  getBrandWCPayRequestParams
}