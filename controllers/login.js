const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { JWT_SECRET } = require('../util/config')
const User = require('../models/user')
const Token = require('../models/token')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  } else if (user.disabled) {
    return response.status(401).json({
      error: 'user is disabled'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, JWT_SECRET)
  await Token.create({ token, userId: user.id })

  response.status(200).send({ token, username: user.username, name: user.name })
})

router.delete('/', async (request, response) => {
  const token = request.token
  await Token.destroy({ where: { token } })
  response.status(204).end()
})

module.exports = router
