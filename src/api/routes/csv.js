"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const csv_parse = require("csv-parse")
const multer = require("multer")
const upload = multer()
const errors = require("../errors")

module.exports = (app) => {

    app.post("/csv/items",
        middleware.verify,
        middleware.guard,
        upload.single("file"),
        (request, response, next) => {

            // only parse files with correct mime type
            if (request.file.mimetype !== "text/csv") {
                throw errors.NOT_A_CSV()
            }

            return new Promise((resolve, reject) => {
                return csv_parse(request.file.buffer, {"delimiter": ";"}, (err, output) => {

                    if (err) {
                        return reject(err)
                    }

                    // check if csv header equals to name, category and price
                    if (output[0][0] !== "name" || output[0][1] !== "category" || output[0][2] !== "price") {
                        // header columns not correct
                        return reject(errors.ITEM_CSV_HEADERS())
                    }

                    // remove first array as these are the column headers of the csv
                    output.splice(0, 1)

                    // loop over each row in csv and create item object
                    for (let row of output) {
                        let number = row[2].replace(",", ".")
                        let amount = number * Math.pow(10, 2)

                        let obj = {
                            "name": row[0],
                            "category": row[1],
                            "price": amount
                        }

                        // Create item from each obj
                        model.Item.create(obj)
                    }

                    return resolve()
                })
            })
            .then(() => {
                response.send("ok")
            })
            .catch(next)
    })

    app.post("/csv/users",
        middleware.verify,
        middleware.guard,
        upload.single("file"),
        (request, response, next) => {

            // only parse files with correct mime type
            if (request.file.mimetype !== "text/csv") {
                throw errors.NOT_A_CSV()
            }

            return new Promise((resolve, reject) => {
                return csv_parse(request.file.buffer, {"delimiter": ";"}, (err, output) => {

                    if (err) {
                        return reject(err)
                    }

                    // check if csv header equals to name, category and price
                    if (output[0][0] !== "name" || output[0][1] !== "email" || output[0][2] !== "role") {
                        return reject(errors.USER_CSV_HEADERS())
                    }

                    // remove first array as these are the column headers of the csv
                    output.splice(0, 1)

                    // loop over each row in csv and create item object
                    for (let row of output) {
                        let obj = {
                            "name": row[0],
                            "email": row[1],
                            "role": row[2],
                            "disabled": false
                        }

                        // Create item from each obj
                        model.User.create(obj)
                    }

                    return resolve()
                })
            })
            .then(() => {
                response.send("ok")
            })
            .catch(next)
        })
}