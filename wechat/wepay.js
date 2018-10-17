const tenpay = require('tenpay')
var sha1 = require('sha1')
// const fs = require('fs')
const path = require('path')
const wxpay_config = require('./config');
const util = require('../util/util')
const Wechat = require('./wechat')
const wechat_file = path.join(__dirname, '../config/wechat.txt')

const Payment = require('wechat-pay').Payment;

const {
  appID,
  mchId,
  partnerKey,
  appSecret,
  token,
  notifyUrl,
} = wxpay_config;

const initConfig = {
    partnerKey,
    appId:appID,
    mchId,
    notifyUrl,
    pfx: fs.readFileSync(path.join(__dirname, '../../config/cert/apiclient_cert.p12'))
};
const payment = new Payment(initConfig);

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
    total_fee: fee * 100, //订单金额(单位：分)
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
  let fee = total_fee
  let order = await wechatApi.unifiedOrder({
    out_trade_no, //商户内部订单号
    body,
    total_fee: fee * 100, //订单金额(单位：分)
    spbill_create_ip: util.get_ip(), //ip地址
    openid
  })
  let result = await api.getPayParamsByPrepay({
    order
  });
  return result
}

async function access_token(ctx) {
  try {
    const wechat = new Wechat(config)
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
          body: '吮指原味鸡 * 1',
          attach: '{"部位":"三角"}',
          out_trade_no: 'kfc' + (+new Date),
          total_fee: 1,
          spbill_create_ip: req.ip,
          openid: req.openid,
          trade_type: 'JSAPI'
      };
      const payargs = await payment.getBrandWCPayRequestParams(order)
      return payargs
  } catch (e) {
    console.log(e)
    ctx.body = 'wrong'
  }
}

async function notifyVerify(ctx) {
  let info = ctx.request.weixin //微信返回的信息

  let total_fee, order_status
  //根据订单号去后台取详细数据
  await axios({
    method: 'get',
    url: 'order/',
    params: {
      order_id: info.out_trade_no
    }
  }).then((res) => {
    total_fee = res.data.fee //金额
    order_status = res.data.order_status //交易完成状态，1表示已完成，0表示未完成
  })
  // 在`node-tenpay`源码中已校验签名，所以这里只需要校验金额
  if (order_status !== 0) {
    ctx.reply('订单已支付')
  } else if (info.total_fee === total_fee) {
    //交易成功，记录入库
    try {
      await axios.post({
        url: 'www.domain.com/api/order/finish/',
        data: {
          order_id: info.out_trade_no, //订单号
          notify_trade_no: info.transaction_id, //微信交易流水号
          order_status: 1, //交易状态
        }
      })
      ctx.reply('') //回复微信商户接收通知成功并校验成功
    } catch (e) {
      ctx.reply(e)
      throw new Error(e)
    }
  } else {
    ctx.reply('金额不一致')
  }
}

module.exports = {
  unifiedOrder,
  wechatApi,
  notifyVerify,
  getPayParams,
  access_token,
  getBrandWCPayRequestParams
}