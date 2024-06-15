class ApplicationError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.status = status
  }
}

class AuthenticationError extends ApplicationError {
  constructor() {
    super('Invalid credentials', 401)
    this.name = 'AuthenticationError'
  }
}

class AuthorizationError extends ApplicationError {
  constructor() {
    super('You are not authorized to perform this action', 403)
    this.name = 'AuthorizationError'
  }
}

class ItemNotFoundError extends ApplicationError {
  constructor(itemName) {
    super(`${itemName} not found`, 404)
    this.name = 'ItemNotFoundException'
  }
}

class MissingFieldsError extends ApplicationError {
  constructor(missingFields) {
    super(`Missing fields: ${missingFields.join(', ')}`, 400)
    this.name = 'MissingFieldsException'
  }
}

module.exports = {
  ApplicationError,
  AuthenticationError,
  AuthorizationError,
  ItemNotFoundError,
  MissingFieldsError
}
