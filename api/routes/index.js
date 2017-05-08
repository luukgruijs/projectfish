"use strict"

module.exports = (app, express) => {

    const router = express.Router()

    require("./item")(router)
    require("./order")(router)

    return router
}