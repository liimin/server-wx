const {Model,response}=require('./common/base')('blessions');
class blessionsController {
    /**
     * 获取祝福语列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getBlessionsList(ctx) {
        try {
            const data =await Model.getBlessionsList(ctx.query)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = blessionsController
