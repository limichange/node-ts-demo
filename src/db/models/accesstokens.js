'use strict';
module.exports = function (sequelize, DataTypes) {
  var Accesstokens = sequelize.define('Accesstokens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
      classMethods: {
        associate(models) {
          models.Accesstokens.belongsTo(models.Users, {
            foreignKey: 'user_id'
          })
        }
      }
    });

  return Accesstokens;
};
