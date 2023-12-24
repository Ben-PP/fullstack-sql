class MalformattedIdError extends Error {
  constructor(message = 'malformatted-id') {
    super(message)
    this.name = 'MalformattedIdError'
  }
}

module.exports = { MalformattedIdError }
