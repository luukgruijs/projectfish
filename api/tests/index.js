"use strict"

const bodyParser = require("body-parser")
const express = require("express")
const errors = require("../errors")
const http = require("http")

global.chai = require("chai")
global.expect = global.chai.expect
global.chai.use(require("chai-as-promised"))
global.testrunner = require("./testrunner")
