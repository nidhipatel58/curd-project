module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("User", "profile", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
