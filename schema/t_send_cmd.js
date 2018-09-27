/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_send_cmd', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sn: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    inde: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    cmd: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    total_time: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(3),
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
    tableName: 't_send_cmd'
  });
};
