const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

class App {
  constructor() {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database() {
    require('./database')
  }

  middlewares() {
    this.express.use(bodyParser.json())
    this.express.use(cors())
  }

  routes() {
    this.express.use(require('../routes'))
  }
}

module.exports = new App().express
