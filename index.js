require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false
})

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
  }
)
Blog.sync()

app.get('/api/blogs', async (req, res) => {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    await sequelize.authenticate()
    const blog = await Blog.create(req.body)
    console.log(JSON.stringify(blog, null, 2))
    res.json(blog)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await sequelize.authenticate()
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
