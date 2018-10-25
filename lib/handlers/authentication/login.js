require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const respondWithError = require("../../utils/respondWithError");
const respond = require("../../utils/respond");
const connectToDatabase = require("../../db");
const model = require("../../models");

const validatePassword = (password, storedPassword, user) => {
  return bcrypt
    .compare(password, storedPassword)
    .then(
      valid =>
        valid
          ? signToken(user)
          : Promise.reject("The credentials do not match.")
    );
};

const signToken = ({ _id, name, email, role }) => {
  const token = jwt.sign(
    {
      _id,
      name,
      email,
      role
    },
    process.env.secret,
    {
      expiresIn: "12h"
    }
  );

  return {
    token,
    _id,
    name,
    email,
    role
  };
};

module.exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const credentials = JSON.parse(event.body);

  return connectToDatabase()
    .then(() =>
      model.User.findOne({ email: credentials.email, disabled: false })
        .select("name email password role")
        .exec()
    )
    .then(user =>
      validatePassword(credentials.password, user.password.hash, user)
    )
    .then(respond)
    .catch(err => respondWithError(400, err));
};
