const router = require('express').Router()
const { MalformattedIdError } = require('../util/errors')
const User = require('../models/user')
const { userExtractor } = require('../middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  console.log(user)
  res.json(user)
})

router.put('/:username', userExtractor, async (req, res) => {
  const userFromToken = req.user
  const user = await User.findOne({ where: { username: req.params.username } })

  if (userFromToken.id !== user.id) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  const newName = req.body.name
  if (!user) {
    res.status(404).json({ error: 'user not found' })
    return
  }
  if (!newName) {
    res.status(400).json({ error: 'name was not provided' })
    return
  }

  console.log('newName', newName)
  const updatedUser = await user.update({ name: req.body.name })
  res.json(updatedUser)
})

module.exports = router