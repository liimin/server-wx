/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_blessions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING(384),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatetie: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, 
  {
    tableName: 't_blessions',
    timestamps: false
  });
};
