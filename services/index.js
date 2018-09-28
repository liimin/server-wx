const Service=require('../common/base')('temple');
const helper= require('../common/helper');
class TemplesModel {
    /**
     * 获取寺观列表
     * @returns {Promise<*>}
     */
    static async getTempleList(params) {
        let { type } =params
        const Pager=helper.PageEx(params)
        const { limit,offset } =Pager
        const where = type ? { type } : null
        const ret = await Service.findAndCountAll({
            limit,
            offset,
            where
        });
        return helper.GetReturnObj(Pager,ret)
    }
}

module.exports = TemplesModel
