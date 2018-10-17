require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");

  return mongoose
    .connect(process.env.DB)
    .then(() => {
      isConnected = true;
    })
    .catch(err => {
      console.log("connection error");
      console.log(err);
    });
};
