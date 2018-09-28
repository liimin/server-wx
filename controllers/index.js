const {Model,response}=require('../common/base')('temple');
class templeController {
    /**
     * 获取寺观列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getTempleList(ctx) {
        try {
            const data =await Model.getTempleList(ctx.query)
            response.SUCCESS(data,ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412,e,ctx);
        }
    }
}
module.exports = templeController
