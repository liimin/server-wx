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
        const { page=1, type } =params
        if (type) {
            ret = await Blessions.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    type
                },
            });

        } else {
            ret = await Blessions.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
            });
        }
        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
    }
}

module.exports = BlessionsModel
