const errorHandler = (error, request, response, next) => {
  console.error('Error name:', error.name)

  switch (error.name) {
    case 'MalformattedIdError':
      return response.status(400).send({ error: 'malformatted id' })
    case 'SequelizeDatabaseError':
      return response.status(400).send({ error: error.message })
    case 'SequelizeValidationError':
      return response.status(400).send({ error: error.message })
    case 'SequelizeUniqueConstraintError':
      return response.status(400).send({
        error: `Validation isUnique on ${error.errors[0].path} failed`
      })
    case 'JsonWebTokenError':
      return response.status(400).json({ error: 'token missing or invalid' })
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'token expired' })
    default:
      next(error)
  }
}

module.exports = errorHandler
