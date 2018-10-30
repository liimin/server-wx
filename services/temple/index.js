const __base = require('../common/base')
const BlessionsService = __base('blessions');
const UserService = __base('user');
const helper = require('../common/helper');
const util = require('../../util/util')
const loader = require('../common/loader');
const request = require('request-promise')
// var qs = require('querystring');
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
   * 获取寺庙详情（文件配置）
   * @returns {Promise<*>}
   */
  static async getTempleDetail(params) {
    let {
      id
    } = params
    const data = await loader.fetch_content()
    return {
      code: 200,
      data
    }
  }

  /**
   * 供灯
   * */
  static async lightOn(formData) {
    const url = `${helper.ServerBase}/lighton`
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
      lights,
      time,
      dimcode,
      sn,
      openid
    } = formData
    const params = {
      "text": words,
      "money": String(amount * 100),
      "temple": tampleName,
      "temple_id": String(temple_id),
      "time": String(time * 24 * 60 * 60),
      'sn': sn,
      "dimcode": "1",
      openid,
      "user": {
        "name": name, //！祈福人微信
        "to": to,
        "to_birth": to_birth,
        "phone": to_phone,
        "to_phone": to_phone,
        "to_addr": to_addr
      },
      "lights": lights
    }
    const sign = util.getSign(params)
    params.sign = sign
    console.log('================================供灯参数====================================', params)
    const body = await request.post({
      url,
      'form': JSON.stringify(params)
    })
    const res = JSON.parse(body)
    console.log('================================供灯返回====================================', res)
    return {
      code: res.errcode == '0' ? 200 : res.errcode,
      data: res
    }
  }
  /**
   * 关灯 （保留）
   * */
  static async lightOff(formData) {
    console.log("===================================off")
    request.get('http://59.110.235.8:9667/test_off?sn=8661040278229830&index=0001').on('error', function(err) {
      console.log(err)
    })
  }

  /**
   * 添加微信用户信息
   * @param {*} WX用户信息 
   */
  static async addWXUser(formData) {
    try {
      const {
        name = '',
          nickname,
          phone,
          monk_id = 0,
          openid,
          temple_id,
          addr = '',
          default_temple_url,
          sex,
          language,
          city,
          province,
          country,
          headimgurl,
          access_token
      } = formData
      const user = {
        name,
        nickname,
        phone,
        monk_id,
        openid,
        temple_id,
        addr,
        default_temple_url,
        sex,
        language,
        city,
        province,
        country,
        headimgurl,
        access_token,
        createtime: new Date(),
        updatetime: new Date()
      }
      const result = await UserService.create(user)
      return {
        code: 200,
        data: '添加成功'
      }

    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 获取设备 
   * @returns {Promise<*>}
   */
  static async getTempleDevice(params) {
    try {
      let {
        temple_id
      } = params
      const sign = util.getSign({
        temple_id
      })
      const url = `${helper.ServerBase}/get_status`
      const content = await loader.fetch_content()
      const form = JSON.stringify({
        temple_id,
        sign: sign,
        temple: content.name
      })
      const body = await request.post({
        url,
        form
      })
      const res = JSON.parse(body)
      console.log('==========================获取设备=========================', res)
      return {
        code: res.errcode == '0' ? 200 : res.errcode,
        data: res
      }
    } catch (error) {
      console.log(error)
    }
  }

   /**
   * 获取供灯记录
   * @returns {Promise<*>}
   */
  static async getRecords(params) {
    let {
      openid
    } = params
    const sign = util.getSign({
      openid
    })
    try {
      const form = JSON.stringify({ openid, sign})
      const url = `${helper.ServerBase}/get_record`
      const body = await request.post({
        url,
        form
      })
      console.log(body);
      const res = JSON.parse(body)
      return {
        code: res.errcode == '0' ? 200 : res.errcode,
        data: res.errcode == '0' ? res.records:[]
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}

module.exports = TempleSevice
