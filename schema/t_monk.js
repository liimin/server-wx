/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_monk', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    fahao: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    temple_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    level: {
      type: DataTypes.STRING(32),
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
    tableName: 't_monk'
  });
};
