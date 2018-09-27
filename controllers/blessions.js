const BlessionsModel = require('../modules/blessions')
const statusCode = require('../util/status-code')

class blessionsController {
    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getBlessionsList(ctx) {
        let params = ctx.query;
        try {
            const data = await BlessionsModel.getBlessionsList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询祝福语列表成功！', data)
        } catch (e) {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }
}

module.exports = blessionsController
