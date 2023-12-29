const router = require('express').Router()
const { Op } = require('sequelize')
const { MalformattedIdError } = require('../util/errors')
const { userExtractor } = require('../middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const search = req.query.search
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['name'] },
    order: [['likes', 'DESC']],
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: search ? `%${search}%` : '%%' } },
        { author: { [Op.iLike]: search ? `%${search}%` : '%%' } }
      ]
    }
  })
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const userFromToken = req.user

  const user = await User.findOne({
    where: { username: userFromToken.username }
  })
  if (!user) {
    res.status(404).json({ error: 'user not found' })
    return
  }
  const body = req.body
  const blog = await Blog.create({ ...body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', userExtractor, async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) next(new MalformattedIdError())
  const blog = await Blog.findByPk(id)

  const userFromToken = req.user
  const creator = await User.findOne({
    where: { id: blog.userId }
  })
  console.log(creator)
  console.log('from token: ', userFromToken)
  if (!creator || userFromToken.id !== creator.id) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  if (!blog) return res.status(404).end()
  await blog.destroy()
  res.status(204).end()
})

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) next(new MalformattedIdError())
  const [rowsAffected, [updatedBlog]] = await Blog.update(req.body, {
    where: { id: req.params.id },
    returning: true
  })
  if (rowsAffected === 0) return res.status(404).end()
  res.json(updatedBlog)
})

module.exports = router
