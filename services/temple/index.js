const __base=require('../common/base')
const BlessionsService=__base('blessions');
const helper= require('../common/helper');
class TempleSevice {
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBlessionsList(params) {
        let { type } =params
        const Pager=helper.PageEx(params)
        const { limit,offset } =Pager
        const where = type ? { type } : null
        const ret = await BlessionsService.findAndCountAll({
            limit,
            offset,
            where
        });
        return helper.GetReturnObj(Pager,ret)
    }
}

module.exports = TempleSevice
