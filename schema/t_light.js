/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_light', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sn: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    inde: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    last_time: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    total_time: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    color: {
      type: DataTypes.INTEGER(1),
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
    tableName: 't_light'
  });
};
