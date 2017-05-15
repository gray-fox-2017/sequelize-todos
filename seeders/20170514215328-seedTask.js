'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Todos',
    [
      {task:"mencari makan", createdAt:new Date(), updatedAt:new Date(), completedDate:null,tag:"makan,cari,pergi",status:0},
      {task:"mencari avalon", createdAt:new Date(), updatedAt:new Date(), completedDate:null,tag:"avalon,pedang,cari,pergi",status:1},
      {task:"tidur siang", createdAt:new Date(), updatedAt:new Date(), completedDate:null,tag:"siang,tidur,santai",status:0},
      {task:"jalan-jalan", createdAt:new Date(), updatedAt:new Date(), completedDate:new Date(),tag:"santai,pergi",status:1},
      {task:"marathon", createdAt:new Date(), updatedAt:new Date(), completedDate:null,tag:"pergi,capek,olahraga",status:0},
      {task:"les krav maga", createdAt:new Date(), updatedAt:new Date(), completedDate:null,tag:"capek,olahraga,pergi",status:0},
      {task:"les gambar", createdAt:new Date(), updatedAt:new Date(), completedDate:new Date(),tag:"digital,realis,duduk",status:1},
    ],
    {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.dropTable('Todos');
  }
};
