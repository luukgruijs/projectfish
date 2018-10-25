const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const settings = JSON.parse(event.body);

  return connectToDatabase()
    .then(() => models.Settings.create(settings))
    .then(settings => respond(settings))
    .catch(() =>
      respondWithError(
        400,
        "Error while updating the settings, please check your submission"
      )
    );
};
