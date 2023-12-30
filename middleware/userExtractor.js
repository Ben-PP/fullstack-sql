const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token not provided' })
  }
  const decodedToken = jwt.verify(request.token, JWT_SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const userFromToken = await User.findOne({
    where: { username: decodedToken.username }
  })
  if (!userFromToken) {
    return response.status(401).json({ error: 'user not found' })
  }
  request.user = userFromToken.toJSON()

  next()
}

module.exports = userExtractor
