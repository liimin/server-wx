const db = require('../config/db');
const Sequelize = db.sequelize;
const Blessions = Sequelize.import('../schema/t_blessions');
Blessions.sync({force: false});

class BlessionsModel {
    /**
     * 获取祝福语列表
     * @returns {Promise<*>}
     */
    static async getBlessionsList(params) {
        let ret = null;
        let { page = 1, type, pageSize = 10 } =params
        const where = type ? { type } : null
        pageSize = +pageSize
        ret = await Blessions.findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where
        });
        return {
            code: 200,
            data: ret.rows,
            page: {
                cur: page,
                total: ret.count,
                size: pageSize,
                pages: Math.ceil(ret.count / pageSize),
            }
        }
    }
}

module.exports = BlessionsModel
