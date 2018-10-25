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
    nickname: {
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
    temple_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    headimgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    access_token: {
      type: DataTypes.STRING(96),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(96),
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
    tableName: 't_user',
    timestamps: false
  });
};
