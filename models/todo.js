'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    task: DataTypes.STRING,
    is_completed: DataTypes.BOOLEAN,
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      getOutstading: function(callback){
        sequelize.query('select * from "Todos" where is_completed=false order by "createdAt" ASC',{type:sequelize.QueryTypes.SELECT})
        .then (tasks=>{
          callback(tasks)
        })
        .catch(err => {
          console.log(err);
        })
      },
      getCompleted: function(callback){
        sequelize.query('select * from "Todos" where is_completed=true order by "updatedAt" ASC',{type:sequelize.QueryTypes.SELECT})
        .then (tasks=>{
          callback(tasks)
        })
        .catch(err => {
          console.log(err);
        })
      },
      filterTag: function(tag,callback){
        sequelize.query(`select * from "Todos" where tag like '%${tag}%'`,{type:sequelize.QueryTypes.SELECT})
        .then (tasks => {
          callback(tasks)
        })
        .catch (err => {
          console.log(err);
        })
      }
    }
  });
  return Todo;
};
