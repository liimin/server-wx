const Service=require('../common/base')('temple');
const helper= require('../common/helper');
class TemplesService {
    /**
     * 获取寺观列表
     * @returns {Promise<*>}
     */
    static async getTempleList(params) {
        let { type,order,citycode } =params
        const Pager=helper.PageEx(params)
        const { limit,offset } =Pager
        const where = {}
        type && (where['type']=type)
        citycode && (where['citycode']=citycode)
        const ret = await Service.findAndCountAll({
            limit,
            offset,
            where
        });
        return helper.GetReturnObj(Pager,ret)
    }
    static async addTemple(params){
        console.log(params)
    }
}

module.exports = TemplesService
