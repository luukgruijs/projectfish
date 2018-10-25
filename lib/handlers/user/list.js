const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const models = require("../../models");

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return connectToDatabase()
    .then(() => models.User.find({ disabled: false }).exec())
    .then(users => {
      if (!users.length) {
        return respondWithError(404, "Coudn't find any users");
      }

      return respond(users);
    })
    .catch(respondWithError);
};
