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
    let arr=[{
      task:'Makan',
      is_completed: false,
      tag:'lapar',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      task:'Minum',
      is_completed: false,
      tag:'haus',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      task:'Tidur',
      is_completed: false,
      tag:'ngantuk',
      createdAt:new Date(),
      updatedAt:new Date()
    }];

    return queryInterface.bulkInsert('Todos',arr, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
