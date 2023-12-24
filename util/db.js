const Sequelize = require('sequelize')
const { DB_URL } = require('./config')

const sequelize = new Sequelize(DB_URL, {
  logging: false
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

module.exports = {
  connectToDatabase,
  sequelize
}
