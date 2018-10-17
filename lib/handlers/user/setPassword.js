const models = require("../../models");
const connectToDabase = require("../../db");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const credentials = JSON.parse(event.body);

  return connectToDabase()
    .then(() => models.User.findById(id, "+password").exec())
    .then(user => {
      user.password = Object.assign({ hash: credentials.password });
      user.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Succesfully set password" })
      };
    });
};
