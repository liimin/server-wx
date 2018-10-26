/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_wechat_info', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    appid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    appsecret: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    access_token: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    start_tm: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    valid_tm: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    temple_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 't_wechat_info',
    timestamps: false
  });
};
