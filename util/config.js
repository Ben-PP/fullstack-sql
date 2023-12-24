require('dotenv').config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  DB_URL,
  PORT,
  JWT_SECRET
}
