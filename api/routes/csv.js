"use strict"

const model = require("../models")
const rest = require("../rest")
const middleware = require("../middleware")
const csv_parse = require("csv-parse")
const multer = require("multer")
const upload = multer()

module.exports = (app) => {

    app.post("/csv/items", middleware.verify, upload.single("file"), (request, response, next) => {

        // only parse files with correct mime type
        if (request.file.mimetype === "text/csv") {
            csv_parse(request.file.buffer, {"delimiter": ";"}, (err, output) => {

                // check if csv header equals to name, category and price
                if (output[0][0] === "name" && output[0][1] === "category" && output[0][2] === "price") {

                    // remove first array as these are the column headers of the csv
                    output.splice(0, 1)

                    // loop over each row in csv and create item object
                    for (let i = 0; i < output.length; i++) {
                        let row = output[i]

                        let obj = {
                            "name": row[0],
                            "category": row[1],
                            "price": Number(row[2])
                        }

                        // Create item from each obj
                        model.item.create(obj)
                    }

                    response.send({"message": "Items succesfully created"})
                }

            })
        } else {
            response.status(422).send({"message": "Please upload a CSV-file"})
        }
    })

    app.post("/csv/users", middleware.verify, (request, response, next) => {

    })
}