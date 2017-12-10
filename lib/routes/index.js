"use strict"

const express = require('express');

module.exports = (app) => {

    const router = express.Router()

    require("./authenticate")(router)
    require("./item")(router)
    require("./csv")(router)
    require("./order")(router)
    require("./user")(router)
    require("./settings")(router)
    require("./lunch_order")(router)

    return router
}