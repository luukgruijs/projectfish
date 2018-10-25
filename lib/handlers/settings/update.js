const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const settings = JSON.parse(event.body);

  return connectToDatabase()
    .then(() => models.Settings.findById(id).exec())
    .then(model => {
      if (!model) {
        return respondWithError(404, "Cound't find user");
      }

      Object.keys(settings).forEach(prop => {
        model[prop] = settings[prop];
      });

      return model.save();
    })
    .then(settings => respond(settings))
    .catch(() =>
      respondWithError(
        400,
        "Error while updating the settings, please check your submission"
      )
    );
};
