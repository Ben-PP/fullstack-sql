const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Token = require('./token')

User.hasMany(Blog)
Blog.belongsTo(User)
User.hasMany(Token)

User.hasMany(ReadingList)
Blog.hasMany(ReadingList)

module.exports = { Blog, User, ReadingList, Token }
