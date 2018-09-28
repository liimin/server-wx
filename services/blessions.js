// const db = require('../config/db');
// const Sequelize = db.sequelize;
// const Blessions = Sequelize.import('../schema/t_blessions');
const Service=require('./common/base')('blessions');
const helper= require('./common/helper');
class BlessionsModel {
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBlessionsList(params) {
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

module.exports = BlessionsModel
