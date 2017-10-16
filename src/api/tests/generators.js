"use strict"

const model = require("../models")

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const HEX_CHARS = CHARS.slice(0, 16)

/**
 * @public
 * forEachPromise will execute an array of promises serially (one after the other)
 * since native Promise does not provide a serial exection of multiple promises
 * but only running them all in parallel, the below function runs multiple promises
 * sequentiallty
 * source: https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach
 *
 * @param {Array} items - the items to execute with the supplied promise function
 * @param {Function} fn - the function to execute for each item, will return a Promise
 * @return {Promise.<Error, Null>} - a promise resolved when all items have been executed
 */
function forEachPromise(items, fn) {
    return items.reduce((promise, item, idx) => {
        return promise.then(() => fn(item, idx, items))
    }, Promise.resolve())
}

class generator {
    static objectId() {
        return this.string({ "domain": HEX_CHARS, "len": 24 })
    }
    static string({ domain = CHARS, len = 16 } = {}) {
        let ret = ""
        for (let i = 0; i < len; i++) {
            ret += this.oneOf(domain)
        }
        return ret
    }
    static oneOf(xs) {
        return xs[Math.floor(Math.random() * xs.length)]
    }
    static cleanDb() {
        const models = Object.keys(model.modelSchemas)
            .map((k) => {
                return model[k]
            })
            .filter((x) => x != null) // Some schemas are embedded types and not models

        return forEachPromise(models, (model) => {
            return model.remove({})
        })
    }
    static objToArr(obj) {
        return Object.keys(obj).map((key) => obj[key])
    }
}

module.exports = generator