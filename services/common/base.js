const db = require('../../config/db');
const Sequelize = db.sequelize;
module.exports = file =>{
   const Schema= Sequelize.import(`../../schema/t_${file}`)
//    Schema.sync({force: false});
   return Schema
}
