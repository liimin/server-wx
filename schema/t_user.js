/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    wechar: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    monk_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addr: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    default_temple_url: {
      type: "VARBINARY(256)",
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
    tableName: 't_user'
  });
};
