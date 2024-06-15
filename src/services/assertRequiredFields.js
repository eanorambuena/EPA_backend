const { MissingFieldsError } = require('./errors')

function assertRequiredFields(data, requiredFields) {
  if (!data) {
    throw new MissingFieldsError(requiredFields)
  }
  console.log(data)
  const missingFields = []
  requiredFields.forEach((field) => {
    if (!data[field]) {
      missingFields.push(field)
    }
  })
  if (missingFields.length) {
    throw new MissingFieldsError(missingFields)
  }
}

module.exports = {
  assertRequiredFields
}
