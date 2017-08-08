'use strict';
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define('Example', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Example;
};