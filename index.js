const express = require('express')
require('express-async-errors')
const cors = require('cors')
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
} = require('./middleware')

const app = express()
app.use(cors())

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readinglistsRouter = require('./controllers/readinglists')
const authorsRouter = require('./controllers/authors')

app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
