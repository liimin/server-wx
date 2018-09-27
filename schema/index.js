'use strict';
var sequelize=require('../config/db');
var Blessions = sequelize.import('./t_blessions.js');
var City = sequelize.import('./t_city.js');
var Consumption = sequelize.import('./t_consumption.js');
var Device = sequelize.import('./t_device.js');
var Fault = sequelize.import('./t_fault.js');
var Light = sequelize.import('./t_light.js');
var Monk = sequelize.import('./t_monk.js');
var SendCmd = sequelize.import('./t_send_cmd.js');
var Temple = sequelize.import('./t_temple.js');
var User = sequelize.import('./t_user.js');
// 同步模型到数据库中
// sequelize.sync();

module.exports={
    User,
    Blessions,
    City,
    Consumption,
    Device,
    Fault,
    Light,
    Monk,
    SendCmd,
    Temple
}
