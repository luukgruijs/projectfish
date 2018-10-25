const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return connectToDatabase()
    .then(() => models.Settings.find().exec())
    .then(settings => {
      if (!settings) {
        return respondWithError(404, "Coudn't find any settings");
      }

      return respond(settings);
    })
    .catch(respondWithError);
};
