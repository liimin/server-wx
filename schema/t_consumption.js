/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_consumption', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    wechar_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    to_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    to_phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    to_wechar: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    to_addr: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    to_birth: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    bless: {
      type: "VARBINARY(64)",
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    inde: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    color: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      defaultValue: '0'
    },
    text: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    money: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_time: {
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
    tableName: 't_consumption'
  });
};
