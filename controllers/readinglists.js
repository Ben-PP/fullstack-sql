const router = require('express').Router()
const { userExtractor } = require('../middleware')
const { ReadingList, Blog, User } = require('../models')

router.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const userFromToken = req.user

  const blog = await Blog.findByPk(body.blogId)
  const userFromBlog = await User.findByPk(body.userId)
  if (!blog || !userFromBlog) {
    res.status(404).json({ error: 'blog or user not found' })
    return
  }
  console.log(userFromBlog.id === userFromToken.id)
  if (userFromBlog.id !== userFromToken.id) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  const readingList = await ReadingList.create({
    blogId: body.blogId,
    userId: body.userId
  })
  res.json(readingList)
})

router.put('/:id', userExtractor, async (req, res) => {
  const body = req.body
  const userFromToken = req.user
  const readingList = await ReadingList.findByPk(req.params.id)
  if (!readingList) {
    res.status(404).json({ error: 'reading list not found' })
    return
  }
  const userFromReadingList = await User.findByPk(readingList.userId)
  if (userFromReadingList.id !== userFromToken.id) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  if (body.isRead === undefined) {
    res.status(400).json({ error: 'isRead was not provided' })
    return
  }
  console.log(body.isRead)
  const updatedReadingList = await readingList.update({ is_read: body.isRead })
  res.json(updatedReadingList)
})

module.exports = router
