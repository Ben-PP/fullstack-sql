const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const User = require('../models/user')
const Token = require('../models/token')

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token not provided' })
  }
  const tokenFromDB = await Token.findOne({ where: { token: request.token } })

  const decodedToken = jwt.verify(request.token, JWT_SECRET)
  if (!decodedToken.id || !tokenFromDB) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const userFromToken = await User.findOne({
    where: { username: decodedToken.username }
  })
  if (!userFromToken) {
    return response.status(401).json({ error: 'user not found' })
  }
  console.log('user from token: ', userFromToken)
  if (userFromToken.disabled) {
    return response.status(401).json({ error: 'user is disabled' })
  }
  request.user = userFromToken.toJSON()

  next()
}

module.exports = userExtractor
