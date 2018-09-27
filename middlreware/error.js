const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)
const response = require('../util/response')

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        try {
            const token = ctx.header.authorization  // 获取jwt
            if (token) {
                let payload
                try {
                    payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
                    const {name,id} =payload
                    ctx.user = {
                        name,
                        id
                    }
                } catch (err) {
                    err.status = response.CODE.ERROR_401;
                    ctx.body = response.ERROR(response.CODE.ERROR_401,'token verify fail');
                }
            }
            await next()
        } catch (err) {
            if (err.status === response.CODE.ERROR_401) {
                ctx.status = response.CODE.ERROR_401;
                ctx.body = response.ERROR(response.CODE.ERROR_401,'unauthorized，请求需要用户的身份认证！');
            } else {
                err.status = response.CODE.ERROR_404;
                ctx.body = response.ERROR(response.CODE.ERROR_404,'不存在的用户');
            }
        }
    }
}
