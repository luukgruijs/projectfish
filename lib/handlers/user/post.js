const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const user = JSON.parse(event.body);

  return connectToDatabase()
    .then(() => models.User.create(user))
    .then(user => respond(user))
    .catch(() =>
      respondWithError(
        400,
        "Error while creating the user, please check your submission"
      )
    );
};
