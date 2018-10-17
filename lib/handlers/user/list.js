const connectToDatabase = require('../../db')
const models = require('../../models')

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return connectToDatabase()
    .then(() => models.User.find({disabled: false}).exec())
    .then(users => ({
      statusCode: 200,
      body: JSON.stringify(users)
    }))
}