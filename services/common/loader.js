const path = require('path'); //系统路径模块
const util = require('../../util/util')
const file = path.join(__dirname, `../../public/1/content.json`); //文件路径，__dirname为当前运行js文件的目录
const TokenManager = require('../../wechat/token-manage')
const wxinfo = require('./base')('wechat_info')
var content = ''
/**
 * 获取寺庙相关配置信息 （读文件）
 */
const fetch_content = function() {
    return new Promise(resolve => {
      if(content) {
        resolve(content)
        return
      }
      util.readFileAsync(file).then(data => {
        content = JSON.parse(data.toString())
        resolve(content)
      })
    })
  }
  /**
   * 启动 access_token 管理 定期更新到数据库
   **/
  ! function() {
    const tokenManager = new TokenManager()
    tokenManager.on('start', function() {
      console.log('=======================TokenManager Start===================');
    });
    tokenManager.on('token', info => {
      console.log('=======================Token Update===================');
      const {
        appid,
        secret,
        token
      } = info
      fetch_content().then(content => {
        const where = {
          'temple_id': content.id
        }
        wxinfo.findOrCreate({
          where,
          defaults: {
            appid,
            'appsecret': secret,
            'access_token': token,
            'start_tm': Date.now(),
            'valid_tm': 7200 - 120,
            'createtime': new Date(),
            'updatetime': new Date()
          }
        }).spread((user, created) => {
          if(created === false) {
            wxinfo.update({
              'access_token': token,
              'start_tm': Date.now(),
              'updatetime': new Date()
            }, {
              where
            }).then(_ => {
              console.log('=======================Token Update Success!==================')
            })
          }
        })
      })
    });
    tokenManager.start()
  }()
exports.fetch_content = fetch_content
