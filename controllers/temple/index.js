const __base = require('../common/base')('temple')
// const path = require('path')
const {
    response
} = __base;
const templeService = __base.Sevice
class templeController {
    /**
     * 获取祝福语列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getBlessionsList(ctx) {
        try {
            const data = await templeService.getBlessionsList(ctx.query)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    /**
     * 获取寺庙详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getTempleDetail(ctx) {
        try {
            const data = await templeService.getTempleDetail(ctx.query)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    static async lightOn(ctx) {
        try {
            const data = await templeService.lightOn(ctx.request.body)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
    static async lightOff(ctx) {
        try {
            const data = await templeService.lightOff(ctx.request.body)
            response.SUCCESS(data, ctx)
        } catch (e) {
            response.ERROR(response.CODE.ERROR_412, e, ctx);
        }
    }
}
module.exports = templeController