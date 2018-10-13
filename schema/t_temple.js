/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_temple', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(48),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    citycode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feature: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    addr: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    direction: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'introduction'
    },
    pic: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    tableName: 't_temple',
    timestamps: false
  });
};
