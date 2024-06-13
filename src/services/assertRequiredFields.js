const { MissingFieldsException } = require('./errors')

function assertRequiredFields(data, requiredFields) {
  if (!data) {
    throw new MissingFieldsException(requiredFields)
  }
  const missingFields = []
  requiredFields.forEach((field) => {
    if (!data[field]) {
      missingFields.push(field)
    }
  })
  if (missingFields.length) {
    throw new MissingFieldsException(missingFields)
  }
}

module.exports = {
  MissingFieldsException,
  assertRequiredFields
}
