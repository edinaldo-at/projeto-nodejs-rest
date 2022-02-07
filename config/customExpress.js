const express = require('express')
const consign = require('consign')

module.export = () => {
  const app = express()

  consign()
    .include('controllers')
    .into(app)

  return app
}
