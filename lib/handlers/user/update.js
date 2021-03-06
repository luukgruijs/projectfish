const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const user = JSON.parse(event.body);

  return connectToDatabase()
    .then(() => models.User.findById(id).exec())
    .then(model => {
      if (!model) {
        return respondWithError(404, "Cound't find user");
      }

      Object.keys(user).forEach(prop => {
        model[prop] = user[prop];
      });

      return model.save();
    })
    .then(user => respond(user))
    .catch(() =>
      respondWithError(
        400,
        "Error while updating the user, please check your submission"
      )
    );
};
