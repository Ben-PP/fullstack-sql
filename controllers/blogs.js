const router = require('express').Router()
const { MalformattedIdError } = require('../util/errors')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) next(new MalformattedIdError())

  const blog = await Blog.findByPk(id)
  if (!blog) return res.status(404).end()
  await blog.destroy()
  res.status(204).end()
})

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) next(new MalformattedIdError())
  const updatedBlog = await Blog.update(req.body, {
    where: { id: req.params.id }
  })
  res.json(updatedBlog)
})

module.exports = router
