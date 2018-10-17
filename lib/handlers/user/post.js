const connectToDatabse = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = JSON.parse(event.body);

  return connectToDatabse()
    .then(() => models.User.create(user))
    .then(user => {
      return { statusCode: 200, body: JSON.stringify(user) };
    })
    .catch(err => {
      console.log(err);

      return { statusCode: 400, body: JSON.stringify(err) };
    });
};
