const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('read_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'blogs',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('read_lists')
  }
}
