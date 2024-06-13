class ItemNotFoundException extends Error {
  constructor(itemName) {
    super(`${itemName} not found`)
    this.name = 'ItemNotFoundException'
  }
}

class MissingFieldsException extends Error {
  constructor(missingFields) {
    super(`Missing fields: ${missingFields.join(', ')}`)
    this.name = 'MissingFieldsException'
  }
}

module.exports = {
  ItemNotFoundException,
  MissingFieldsException
}
