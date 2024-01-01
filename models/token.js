const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Token extends Model {}
Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'token'
  }
)

module.exports = Token
