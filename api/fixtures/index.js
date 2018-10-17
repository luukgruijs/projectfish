"use strict";

const mongoose = require("mongoose");
const models = require("../models");
const config = require("../config");

exports.startup = function() {
  const users = models.user.find().exec();
  users.then(users => {
    if (users.length < 2) {
      let admin = new models.user();
      admin.name = config.name;
      admin.email = "testadmin@projectfish.nl";
      admin.password = {
        hash: config.password
      };
      admin.role = "admin";
      admin.disabled = false;
      admin.save();

      let user = new models.user();
      user.name = config.name;
      user.email = "testuser@projectfish.nl";
      user.password = {
        hash: config.password
      };
      user.role = "user";
      user.disabled = false;
      user.save();
    }
  });

  const settings = models.settings.findOne().exec();
  settings.then(settings => {
    if (!settings) {
      let settings = new models.settings();
      settings.budget = 0;
      settings.save();
    }
  });
};
