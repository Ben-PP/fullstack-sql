const Sequelize = require('sequelize')
const { DB_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DB_URL, {
  logging: false
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to database')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((m) => m.name)
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConfig)
  const migrations = await migrator.down()
  console.log('Migrations rolled back', {
    files: migrations.map((m) => m.name)
  })
}

module.exports = {
  connectToDatabase,
  rollbackMigration,
  sequelize
}
