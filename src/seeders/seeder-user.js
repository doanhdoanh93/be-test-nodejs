"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "xxx@gmail.com",
        password: "123456",
        firstName: "Hoang",
        lastName: "Doanh",
        address: "HN",
        gender: 1,
        roleId: "ROLE",
        phoneNumber: "123456789",
        positionId: "PGS",
        image: "hahaha",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
