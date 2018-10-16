const __base = require('../common/base')('temples')
const {
    response
} = __base;
const TemplesSevice = __base.Sevice
class templesController {
    /**
     * 获取寺观列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getTempleList(ctx) {
        try {
            const data = await TemplesSevice.getTempleList(ctx.query)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    static async addTemple(ctx) {
        try {
            console.log(ctx.request.body)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
}
module.exports = templesController