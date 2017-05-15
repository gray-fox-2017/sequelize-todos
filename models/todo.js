'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    task: DataTypes.STRING,
    iscomplete: DataTypes.BOOLEAN,
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todo;
};