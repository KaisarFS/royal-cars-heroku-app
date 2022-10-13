'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = JSON.parse(fs.readFileSync('./data/users.json','utf-8'))
     let result = data.map(el => {
       delete el.id
       el.createdAt = new Date()
       el.updatedAt = new Date()
       return el
     })
     return queryInterface.bulkInsert('Users', result, {})
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
