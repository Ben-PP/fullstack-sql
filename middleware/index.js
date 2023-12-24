const errorHandler = require('./errorHandler')
const unknownEndpoint = require('./unknownEndpoint')
const tokenExtractor = require('./tokenExtractor')
const userExtractor = require('./userExtractor')

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}
